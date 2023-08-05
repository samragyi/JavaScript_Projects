const fs = require('fs');
const path = require('path');

const usersFile = path.join(__dirname, 'users.json');



function checkIfUserExists(username) {
  return users.some(user => user.username === username);
}

function addUser(username, password) {
  users.push({ username, password, tasks: [] });
  //users.push({ username, password });
  saveUserRecord();
}

function getUserByUsername(username) {
  return users.find(user => user.username === username);
}

function addTaskForUser(username, task) {
  const userIndex = users.findIndex(user => user.username === username);
  if (userIndex !== -1) {
    users[userIndex].tasks.push(task);
    saveUserRecord();
  }
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

function updateTaskStatusForUser(username, taskId, completed) {
  fs.readFile(usersFile, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading users file:', err);
      return;
    }

    const users = JSON.parse(data);

    // Find the user in the users array
    const userIndex = users.findIndex((user) => user.username === username);

    if (userIndex === -1) {
      console.error(`User with username "${username}" not found.`);
      return;
    }

    // Find the task in the user's tasks array
    const taskIndex = users[userIndex].tasks.findIndex((task) => task.id === taskId);

    if (taskIndex === -1) {
      console.error(`Task with ID "${taskId}" not found for user "${username}".`);
      return;
    }

    // Update the task status
    users[userIndex].tasks[taskIndex].completed = completed;

    // Save the updated data back to the file
    fs.writeFile(usersFile, JSON.stringify(users, null, 2), (err) => {
      if (err) {
        console.error('Error writing to users file:', err);
        return;
      }

      console.log(`Task status updated for user "${username}", task ID "${taskId}": completed=${completed}`);
    });
  });
}

function deleteTaskForUser(username, taskId) {
  fs.readFile(usersFile, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading users file:', err);
      return;
    }

    const users = JSON.parse(data);

    // Find the user in the users array
    const userIndex = users.findIndex((user) => user.username === username);

    if (userIndex === -1) {
      console.error(`User with username "${username}" not found.`);
      return;
    }

    // Find the task in the user's tasks array
    const taskIndex = users[userIndex].tasks.findIndex((task) => task.id === taskId);

    if (taskIndex === -1) {
      console.error(`Task with ID "${taskId}" not found for user "${username}".`);
      return;
    }

    // Remove the task from the user's tasks array
    users[userIndex].tasks.splice(taskIndex, 1);

    // Save the updated data back to the file
    fs.writeFile(usersFile, JSON.stringify(users, null, 2), (err) => {
      if (err) {
        console.error('Error writing to users file:', err);
        return;
      }

      console.log(`Task deleted for user "${username}", task ID "${taskId}"`);
    });
  });
}
module.exports = {
  checkIfUserExists,
  addUser,
  getUserByUsername,
  addTaskForUser,
  saveUserRecord,
  updateTaskStatusForUser,
  deleteTaskForUser,
};
