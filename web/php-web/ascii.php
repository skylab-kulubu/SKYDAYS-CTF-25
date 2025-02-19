<?php
if (session_status() == PHP_SESSION_NONE) {
    session_start();
}

if (isset($_SESSION['ascii_file']) && file_exists($_SESSION['ascii_file'])) {
    echo htmlspecialchars(file_get_contents($_SESSION['ascii_file']));
} else {
    echo "No ASCII output available.";
}
?>