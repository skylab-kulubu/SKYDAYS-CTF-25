<?php
session_start();

$upload_folder = 'uploads/';
$ascii_folder = 'ascii_output/';

if (!file_exists($upload_folder)) {
    mkdir($upload_folder, 0777, true);
}
if (!file_exists($ascii_folder)) {
    mkdir($ascii_folder, 0777, true);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['file'])) {
    $file = $_FILES['file'];

    if ($file['error'] !== 0) {
        $_SESSION['message'] = 'Error uploading file.';
        header('Location: upload.php');
        exit;
    }

    $filename = basename($file['name']);
    $target_path = $upload_folder . $filename;
    $ext = strtolower(pathinfo($filename, PATHINFO_EXTENSION));
    $whitelist = ['png', 'jpg', 'jpeg', 'bmp', 'gif', 'webp'];
    $blacklist = [
        'php', 'php3', 'php4', 'php5', 'php7', 'php8', 'phar',
        'asp', 'aspx', 'cfm', 'cfml', 'jsp', 'jspx', 'jhtml',
        'pl', 'py', 'rb', 'sh', 'bash', 'perl', 'cgi', 'cmd', 'bat', 'exe',
        'dll', 'so', 'jar', 'war', 'msi', 'com',
        'shtm', 'shtml', 'phtm', 'config', 'conf', 'cfg',
        'txt', 'ini', 'log',
        'zip', 'tar', 'gz', 'bz2', 'xz', '7z', 'tgz', 'rar',
        'doc', 'docx', 'xls', 'xlsx', 'pdf'
    ];
    function check_magic_bytes($file_path) {
        $finfo = finfo_open(FILEINFO_MIME_TYPE);
        $mime_type = finfo_file($finfo, $file_path);
        finfo_close($finfo);

        $allowed_mime_types = [
            'image/jpeg', 'image/png', 'image/bmp', 'image/gif', 'image/webp'
        ];

        return in_array($mime_type, $allowed_mime_types);
    }

    $allow_upload = false;
    if (in_array($ext, $whitelist)) {
        if (check_magic_bytes($file['tmp_name'])) {
            $allow_upload = true;
        } else {
            $_SESSION['message'] = "Invalid file format. Fake image detected!";
            header('Location: upload.php');
            exit;
        }
    }
    elseif (in_array($ext, $blacklist)) {
        $_SESSION['message'] = "File type '$ext' is not allowed.";
        header('Location: upload.php');
        exit;
    }
    else {
        if (check_magic_bytes($file['tmp_name'])) {
            $allow_upload = true;
        } else {
            $_SESSION['message'] = "File type '$ext' is not recognized and failed security checks.";
            header('Location: upload.php');
            exit;
        }
    }
    if ($allow_upload && move_uploaded_file($file['tmp_name'], $target_path)) {
        $_SESSION['uploaded_file'] = $filename;
        $ascii_file = $ascii_folder . pathinfo($filename, PATHINFO_FILENAME) . '.txt';
        exec("jp2a --width=80 --output=$ascii_file $target_path");

        $_SESSION['ascii_file'] = $ascii_file;
        $_SESSION['message'] = "File '$filename' uploaded successfully!";
    } else {
        $_SESSION['message'] = 'Failed to save the file.';
    }
} else {
    $_SESSION['message'] = 'No file selected.';
}

header('Location: upload.php');
exit;