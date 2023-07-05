// program to read user input from command line and write it in a file

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question('Enter the file name: ', (fileName) => {
  const filePath = path.join(__dirname, fileName); // __dirname is used to keep the file in the current directory
  rl.question('Enter the content to write: ', (content) => {
    fs.writeFileSync(filePath, content);
    console.log(`Successfully wrote "${content}" to ${fileName}.`);
    rl.close();
  });
});

