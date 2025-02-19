function getValidImageTypes() {
    return ['image/jpeg', 'image/png', 'image/gif', 'image/bmp', 'image/webp'];
}

function getFileExtension(fileName) {
    return fileName.slice(fileName.lastIndexOf('.')).toLowerCase();
}

function checkFileExtension(file) {
    let fileName = file.name;
    const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp'];
    let ext = getFileExtension(fileName);
    return allowedExtensions.includes(ext);
}

function checkFileSize(file) {
    const maxSize = 10 * 1024 * 1024;
    return file.size <= maxSize;
}

function validateFile(fileInput) {
    const file = fileInput.files[0];
    const uploadMessage = document.getElementById('upload-message');
    uploadMessage.innerHTML = '';

    if (!getValidImageTypes().includes(file.type)) {
        uploadMessage.innerHTML = "<span style='color: red;'>Invalid file type! Only image files are allowed.</span>";
        return false;
    }

    if (!checkFileExtension(file)) {
        uploadMessage.innerHTML = "<span style='color: red;'>Invalid file extension! Only image files are allowed.</span>";
        return false;
    }

    if (!checkFileSize(file)) {
        uploadMessage.innerHTML = "<span style='color: red;'>File size exceeds the 10MB limit!</span>";
        return false;
    }

    return true;
}

function hiddenImageCheck(file) {
    const reader = new FileReader();
    reader.onload = function(e) {
        const img = new Image();
        img.onload = function() {
            if (img.width <= 0 || img.height <= 0) {
                document.getElementById('upload-message').innerHTML = "<span style='color: red;'>Not a valid image file!</span>";
            }
        };
        img.onerror = function() {
            document.getElementById('upload-message').innerHTML = "<span style='color: red;'>Error loading image!</span>";
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
}