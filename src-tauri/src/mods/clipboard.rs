use arboard::Clipboard;
use tokio::time::{sleep, Duration};
use std::sync::Arc;
use std::path::PathBuf;

use crate::mods::db::Database;
use crate::mods::tagger;

pub async fn start_clipboard_watcher(db: Arc<Database>, app_data_dir: PathBuf) {
    let mut clipboard = Clipboard::new().unwrap();
    let mut last = String::new();
    let mut last_img: Option<Vec<u8>> = None;
    
    loop{
        if let Ok(txt) = clipboard.get_text(){
            if txt != last { 
                db.insert(&txt).unwrap();
                let id = db.last_insert_id();
                let tag = tagger::tag(&txt).await;
                db.update_tag(id, &tag).unwrap();
                last = txt;
            }
        } else if let Ok(img) = clipboard.get_image(){
            let img_bytes = img.bytes.to_vec();

            if last_img.as_deref() != Some(&img_bytes) {
                let images_dir = app_data_dir.join("images");
                std::fs::create_dir_all(&images_dir).unwrap();

                let filename = format!("{}.png", chrono::Utc::now().timestamp_millis());
                let path = images_dir.join(&filename);

                image::save_buffer(&path, &img_bytes, img.width as u32, img.height as u32, image::ColorType::Rgba8).unwrap();

                db.insert_image(path.to_str().unwrap()).unwrap();
                last_img = Some(img_bytes);
                last = String::new();
            }
        }

        sleep(Duration::from_millis(500)).await;
    }
}