const fs = require('fs');
const path = require('path');

const usersFile = path.join(__dirname, 'users.json');



function checkIfUserExists(username) {
  return users.some(user => user.username === username);
}

function addUser(username, password) {
  users.push({ username, password });
  saveUserRecord();
}

function getUserByUsername(username) {
  return users.find(user => user.username === username);
}


let users = [];
try {
  const data = fs.readFileSync(usersFile, 'utf-8');
  users = JSON.parse(data);
} catch (error) {
  console.error('Error reading users file:', error);
}

// Function to save the user records to the file
function saveUserRecord() {
  try {
    const data = JSON.stringify(users);
    fs.writeFileSync(usersFile, data, 'utf-8');
  } catch (error) {
    console.error('Error saving user record:', error);
  }
}


module.exports = {
  checkIfUserExists,
  addUser,
  getUserByUsername,
};
