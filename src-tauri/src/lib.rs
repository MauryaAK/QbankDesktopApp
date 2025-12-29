// #[cfg_attr(mobile, tauri::mobile_entry_point)]
// pub fn run() {
//   tauri::Builder::default()
//     .setup(|app| {
//       if cfg!(debug_assertions) {
//         app.handle().plugin(
//           tauri_plugin_log::Builder::default()
//             .level(log::LevelFilter::Info)
//             .build(),
//         )?;
//       }
//       Ok(())
//     })
//     .run(tauri::generate_context!())
//     .expect("error while running tauri application");
// }

use tauri::command;
use sha2::{Digest, Sha256};

#[command]
fn get_device_info() -> serde_json::Value {
    let hostname = hostname::get()
        .unwrap_or_default()
        .to_string_lossy()
        .to_string();

    let os = std::env::consts::OS;
    let arch = std::env::consts::ARCH;

    // Stable, privacy-safe fingerprint
    let raw_fingerprint = format!("{}-{}-{}", hostname, os, arch);

    let mut hasher = Sha256::new();
    hasher.update(raw_fingerprint.as_bytes());
    let fingerprint = format!("{:x}", hasher.finalize());

    serde_json::json!({
        "deviceName": hostname,
        "os": os,
        "arch": arch,
        "fingerprint": fingerprint
    })
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .setup(|app| {
            // Logging only in debug
            if cfg!(debug_assertions) {
                app.handle().plugin(
                    tauri_plugin_log::Builder::default()
                        .level(log::LevelFilter::Info)
                        .build(),
                )?;
            }
            Ok(())
        })
        // 👇 REGISTER COMMANDS HERE
        .invoke_handler(tauri::generate_handler![
            get_device_info
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}







// use tauri::command;
// use sha2::{Digest, Sha256};

// #[command]
// fn get_device_info() -> serde_json::Value {
//     let hostname = hostname::get()
//         .unwrap_or_default()
//         .to_string_lossy()
//         .to_string();

//     let os = std::env::consts::OS;
//     let arch = std::env::consts::ARCH;

//     // Stable, privacy-safe fingerprint
//     let raw_fingerprint = format!("{}-{}-{}", hostname, os, arch);

//     let mut hasher = Sha256::new();
//     hasher.update(raw_fingerprint.as_bytes());
//     let fingerprint = format!("{:x}", hasher.finalize());

//     serde_json::json!({
//         "deviceName": hostname,
//         "os": os,
//         "arch": arch,
//         "fingerprint": fingerprint
//     })
// }

// #[cfg_attr(mobile, tauri::mobile_entry_point)]
// pub fn run() {
//     tauri::Builder::default()
//         // ✅ HTTP plugin (REQUIRED for http:default permission)
//         .plugin(tauri_plugin_http::init())

//         .setup(|app| {
//             // Logging only in debug
//             if cfg!(debug_assertions) {
//                 app.handle().plugin(
//                     tauri_plugin_log::Builder::default()
//                         .level(log::LevelFilter::Info)
//                         .build(),
//                 )?;
//             }
//             Ok(())
//         })
//         // ✅ Existing commands untouched
//         .invoke_handler(tauri::generate_handler![
//             get_device_info
//         ])
//         .run(tauri::generate_context!())
//         .expect("error while running tauri application");
// }
