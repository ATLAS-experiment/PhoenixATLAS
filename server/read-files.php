<?php
// Do not report errors (comment for development).
error_reporting(E_ERROR | E_PARSE);

// Associative array / dictionary for configuration.
$config = array(
  "directory" => './data'
);

// Read all files in the given directory. The directory is relative to this PHP script.
function readAllFilesInDirectory($dir) {
  $dirIterator = new RecursiveIteratorIterator(new RecursiveDirectoryIterator($dir));
  $filesArray = array(); 
  
  foreach ($dirIterator as $path) {
      if (!$path->isDir()){ 
        $filesArray[] = $path->getPathname(); 
      }
  }

  return $filesArray;
}

// Throw a 404 if the configured directory is not found.
if (!is_dir($config['directory'])) {
  http_response_code(404);
  return;
}

// Base URL for making the request to get a file.
$requestUrl = dirname($_SERVER['PHP_SELF']) . '/';

// Read all the files in the configured directory.
$allFiles = readAllFilesInDirectory($config['directory']);

// Prepare response which includes a `requestUrl` and the `files` which can be request from that base `requestUrl`.
$response = array('requestUrl' => $requestUrl, 'files' => $allFiles);

// Send the response.
echo json_encode($response);
