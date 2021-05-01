<?php
// Do not report errors (comment for development).
error_reporting(E_ERROR | E_PARSE);

// Associative array / dictionary for configuration.
$config = array(
  'directory' => './data/'
);

// If the `f` query param is set then read the file specified through the param.
if (isset($_GET['f'])) {
  echo file_get_contents($config['directory'] . $_GET['f']);
  return;
}

// Read all files in the given directory. The directory is relative to this PHP script.
function readAllFilesInDirectory($dir)
{
  $dirIterator = new RecursiveIteratorIterator(new RecursiveDirectoryIterator($dir));
  $filesArray = array();

  foreach ($dirIterator as $path) {
    if (!$path->isDir()) {
      $filesArray[] = str_replace('\\', '/', $path->getPathname());
    }
  }

  return $filesArray;
}

// Throw a 404 if the configured directory is not found.
if (!is_dir($config['directory'])) {
  http_response_code(404);
  return;
}

// Read all the files in the configured directory.
$allFiles = readAllFilesInDirectory($config['directory']);

// Prepare the response and remove `./data` at the start of files paths.
$response = array_map(
  function ($file) use ($config) {
    return substr($file, strlen($config['directory']));
  },
  $allFiles
);

// Send the response.
echo json_encode($response);
