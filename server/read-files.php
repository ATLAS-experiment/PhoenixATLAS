<?php

$directory = $_GET['directory'];

if (strpos($directory, '/') !== false) {
  http_response_code(401);
  echo 'Invalid directory';
  return;
}

$filesAndDirectories = array("files" => array(), "directories" => array());

$contentInDirectory = scandir($directory);
// Remove ".." and ".".
$contentInDirectory = array_values(array_diff($contentInDirectory, ['..', '.']));

foreach($contentInDirectory as $fileOrDirectory) {
  $key = is_dir($fileOrDirectory) ? "directories" : "files";
  array_push($filesAndDirectories[$key], $fileOrDirectory);
}

echo json_encode($filesAndDirectories);
