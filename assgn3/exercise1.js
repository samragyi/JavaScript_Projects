//program that recursively searches a directory for files with a specific extension and copies them to a new directory.

const fs = require('fs');
const path = require('path');

// mention source and destination directories
const srcDir = 'C:/Users/samra/Documents/Codequotient/f1';
const destDir = 'C:/Users/samra/Documents/Codequotient/assgn3/assgn3sub';


// here the structure of directories is like: f1\f2\f3\f4\f5\new.txt

// recursive function
function copyFilesByExtension(sourceDir, targetDir, extension) {
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir);
  }

  const files = fs.readdirSync(sourceDir);

  files.forEach((file) => {
    const filePath = path.join(sourceDir, file);
    const fileStat = fs.statSync(filePath);

    if (fileStat.isDirectory()) {
      copyFilesByExtension(filePath, targetDir, extension); // calling function recursively
    } else if (path.extname(file) === `.${extension}`) {
      const targetFilePath = path.join(targetDir, file);
      fs.copyFileSync(filePath, targetFilePath);
      console.log(`Copied: ${filePath} -> ${targetFilePath}`);
    }
  });
}

copyFilesByExtension(srcDir, destDir, 'txt');
console.log('File copy completed.');

