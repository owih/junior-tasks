const fs = require('fs');
const path = require('path');

// Вернуть пути ко всем файлам в дирректории
const getAllFilesInPathSync = (src, files = [], recursive = true) => {
  fs.readdirSync(src).forEach((file) => {
    let name = path.join(src, file);
    if (fs.statSync(name).isDirectory()) {
      if (recursive) {
        getAllFilesInPathSync(name, files);
      }
    } else {
      files.push(name);
    }
  });
  return files;
};

// Вернуть пути ко всем файлам в дирректории
const getAllDirectoriesInPathSync = (src, files = [], recursive = true) => {
  fs.readdirSync(src).forEach((file) => {
    let name = path.join(src, file);
    if (fs.statSync(name).isDirectory()) {
      if (recursive) {
        files.push(name);
        getAllDirectoriesInPathSync(name, files);
      }
    }
  });
  return files;
};

module.exports = {
  getAllFilesInPathSync,
  getAllDirectoriesInPathSync,
};
