use tauri::Manager;
use std::sync::Arc;

mod mods;
use mods::{db, clipboard, tray, commands};

#[tokio::main]
pub async fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .setup(|app| {
            let path = app.path().app_data_dir()?.join("clippr.db");
            let db = Arc::new(db::Database::new(path).expect("cant open database"));
            let db_clone = Arc::clone(&db);

            app.manage(db);

            let tagger_path = std::env::current_dir()
                .unwrap()
                .parent()
                .unwrap()
                .join("tagger/main.py");
                    
            let python_path = std::env::current_dir()
                .unwrap()
                .parent()
                .unwrap()
                .join("tagger/venv/bin/python");
                    
            std::process::Command::new(python_path)
                .arg(tagger_path)
                .spawn()
                .expect("tagger is broken");

            std::thread::sleep(std::time::Duration::from_secs(1));

            let app_data_dir = app.path().app_data_dir()?;
            tokio::spawn(clipboard::start_clipboard_watcher(db_clone, app_data_dir));
            tray::create_tray(app.handle())?;

            Ok(())
        })
        .on_window_event(|window, event| {
            if let tauri::WindowEvent::CloseRequested { api, .. } = event {
                window.hide().unwrap();
                api.prevent_close();
            }
        })
        .invoke_handler(tauri::generate_handler![
            commands::get_clipboard,
            commands::remove,
            commands::toggle_pin,
            commands::copy_to_clipboard,
            commands::clear_history,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}