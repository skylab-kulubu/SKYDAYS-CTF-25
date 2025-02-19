<?php
session_start();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Upload & Convert to ASCII</title>
    <link rel="stylesheet" href="style-upload.css">
    <script src="image-validation.js"></script>
    <script>
        function updateFileName() {
            const fileInput = document.getElementById('file');
            const fileName = fileInput.files[0]?.name || '';
            const fileNameElement = document.getElementById('file-name');
            fileNameElement.textContent = fileName ? `Selected File: ${fileName}` : '';
        }

        function handleFileChange() {
            const fileInput = document.getElementById('file');
            const file = fileInput.files[0];

            if (file) {
                hiddenImageCheck(file);
                if (!validateFile(fileInput)) {
                    fileInput.value = '';
                } else {
                    updateFileName();
                }
            }
        }
    </script>
</head>
<body>
    <div class="container">
        <div class="box upload-box">
            <h1 class="title">Upload & Convert to ASCII</h1>
            <p class="description">Upload an image, and we'll convert it into ASCII art.</p>
            <form action="upload_handler.php" method="POST" enctype="multipart/form-data" class="upload-form">
                <label for="file" class="file-label">Choose File</label>
                <input type="file" name="file" id="file" class="file-input" accept="image/*" required onchange="handleFileChange();">
                <p id="file-name" class="file-name"></p>
                <div class="form-footer">
                    <input type="submit" value="Upload & Convert" class="upload-btn">
                </div>
            </form>

            <div id="upload-message" class="message">
                <?php
                if (isset($_SESSION['message'])) {
                    echo $_SESSION['message'];
                    unset($_SESSION['message']);
                }
                ?>
            </div>
        </div>

        <?php if (isset($_SESSION['uploaded_file'])): ?>
            <div class="result-box">
                <div class="box image-preview">
                    <h2>Uploaded Image</h2>
                    <div class="scrollable-content">
                        <img src="uploads/<?php echo htmlspecialchars($_SESSION['uploaded_file']); ?>" alt="Uploaded Image">
                    </div>
                </div>
                <div class="box ascii-output">
                    <h2>ASCII Art</h2>
                    <div class="scrollable-content">
                        <pre>
                            <?php
                            include 'ascii.php';
                            ?>
                        </pre>
                    </div>
                </div>
            </div>
        <?php endif; ?>
    </div>
</body>
</html>