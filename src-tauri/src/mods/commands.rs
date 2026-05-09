use tauri::State;
use std::sync::Arc;
use crate::mods::db::Database;
use arboard::Clipboard;

#[tauri::command]
pub fn get_clipboard(db: State<Arc<Database>>) -> Vec<(i64, String, String, bool, String, String, String)> {
    db.get_all().unwrap_or_default()
}

#[tauri::command]
pub fn remove(db: State<Arc<Database>>, id: i64) {
    db.delete(id).unwrap();
}

#[tauri::command]
pub fn toggle_pin(db: State<Arc<Database>>, id: i64, pinned: bool) {
    db.toggle_pin(id, pinned).unwrap();
}

#[tauri::command]
pub fn copy_to_clipboard(content: String, item_type: String, image_path: String) {
    let mut clipboard = Clipboard::new().unwrap();
    if item_type == "image" {
        let img_data = std::fs::read(&image_path).unwrap();
        let img = image::load_from_memory(&img_data).unwrap().to_rgba8();
        let (w, h) = img.dimensions();

        clipboard.set_image(arboard::ImageData {
            width: w as usize,
            height: h as usize,
            bytes: img.into_raw().into(),
        }).unwrap();
    } 
    else { clipboard.set_text(content).unwrap(); }
}

#[tauri::command]
pub fn clear_history(db: State<Arc<Database>>) {
    db.delete_all_unpinned().unwrap();
}