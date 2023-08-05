const express = require('express');
const bodyParser = require('body-parser');  
const app = express();
const fs = require("fs");
const path = require("path");

const port = 8000;
var session = require("express-session");
const taskFile = path.join(__dirname, 'tasks.json');

let tasks = [];

const { checkIfUserExists, addUser, 
  getUserByUsername, addTaskForUser, 
  saveUserRecord, updateTaskStatusForUser, deleteTaskForUser } = require('./users');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
}));

app.get('/user-data', function (req, res) {
  if (!req.session.isLoggedIn) {
    return res.status(401).json({ error: 'Not logged in' });
  }

  const username = req.session.username;

  fs.readFile('users.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    const users = JSON.parse(data);

    const user = users.find((user) => user.username === username);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ tasks: user.tasks });
  });
});

app.post('/users-data/tasks', (req, res) => {
  const username = req.session.username;
  const newTask = req.body;

  newTask.id = tasks.length + 1;
  newTask.completed = false;
  tasks.push(newTask);
  res.status(201).json(newTask);
  addTaskForUser(username, newTask);
});

app.put('/users-data/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const taskIndex = tasks.findIndex((task) => task.id === taskId);
  const username = req.session.username;

  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }

  const completed = req.body.completed;

  tasks[taskIndex].completed = completed;
  updateTaskStatusForUser(username, taskId, completed);

  res.json(tasks[taskIndex]);
});

app.delete('/users-data/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const username = req.session.username;
  tasks = tasks.filter((task) => task.id !== taskId);

  res.json({ message: 'Task deleted successfully' });
  deleteTaskForUser(username, taskId);
});


app.get("/login", function(req, res){
  res.render("login", {error : null});
});

app.post("/login", function(req, res){
  const username = req.body.username;
  const password = req.body.password;

  const user = getUserByUsername(username);

  if (!user) {
    res.render("login", {error: "Invalid credentials"});
    return;
  }

  if (user.password !== password) {
    res.render("login",{error: "Invalid credentials"});
    return;
  }

  req.session.isLoggedIn = true;
  req.session.username = username;
  res.redirect('/');
  fs.readFile('users.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Internal Server Error');
    }

    const users = JSON.parse(data);

    const loggedInUser = users.find((user) => user.username === username);

    if (!loggedInUser) {
      return res.status(404).send('User not found');
    }

    res.render("index", { user: loggedInUser }); // Pass user data to the EJS template
  });
});

app.get("/logout", function(req, res) {
  req.session.destroy(function(err) {
    if (err) {
      console.log(err);
    }
    res.redirect("/login");
  });
});

app.get("/signup", function (req, res) {
  res.render("signup", {error: null});
});

app.post("/signup", function(req, res){
  const username = req.body.username;
  const password = req.body.password;

  if (checkIfUserExists(username)) {
    res.render("signup", {error: "Username already registered"});
    return;
  }

  // Add the new user
  addUser(username, password);

  res.redirect("login");
});

app.get('/', function (req, res) {
  if (!req.session.isLoggedIn) {
    res.redirect('/login');
    return;
  }

  res.render('index', { username: req.session.username });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});










/*
const express = require('express');
const bodyParser = require('body-parser');  //body parsing middleware.
const app = express();
const fs = require("fs");
const path = require("path");

const port = 8000;
var session = require("express-session");
const taskFile = path.join(__dirname, 'tasks.json');


let tasks = [];  //Declare an array to store the tasks.

const { checkIfUserExists, addUser, 
  getUserByUsername, addTaskForUser, 
  saveUserRecord, updateTaskStatusForUser, deleteTaskForUser } = require('./users');


app.use(bodyParser.urlencoded({ extended: true }));  // use body-parser for url encoded data
app.use(bodyParser.json());                         // use body-parser for json 
app.use(express.static('public'));

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Set the views directory
app.set('views', path.join(__dirname, 'views'));


app.use(session({
  secret: 'keyboard cat', //for encryption
  resave: false,
  saveUninitialized: true,
})
);



app.get('/api/tasks', (req, res) => {     //When a GET request is made to this route, 
  //the server responds by sending the 'tasks' array in JSON format.
  res.json(tasks);
});


app.get('/user-data', function (req, res) {
  if (!req.session.isLoggedIn) {
    return res.status(401).json({ error: 'Not logged in' });
  }

  const username = req.session.username;

  // Read user data from users.json file
  fs.readFile('users.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    const users = JSON.parse(data);

    const user = users.find((user) => user.username === username);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ user });
  });
});


app.post('/users-data/tasks', (req, res) => {
  //When a POST request is made to this route, 
  // the server adds a new task to the 'tasks' array and responds with the newly created task in JSON format.
  const username = req.session.username;
  const newTask = req.body;

  newTask.id = tasks.length + 1;
  newTask.completed = false;
  tasks.push(newTask);
  res.status(201).json(newTask);
  addTaskForUser(username, newTask);
});


app.put('/users-data/tasks/:id', (req, res) => {
// When a PUT request is made to this route, 
//the server updates the completion status of a task based on its 'id', and responds with the updated task in JSON format.
  
  const taskId = parseInt(req.params.id);
  const taskIndex = tasks.findIndex((task) => task.id === taskId);
  const username = req.session.username;
  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }

  const completed = req.body.completed;
  task.id = user.tasks.length + 1;
  // Update the task in the tasks array
  tasks[taskIndex].completed = completed;

  // Update the task in the user's data
  updateTaskStatusForUser(username, taskId, completed);

  res.json(tasks[taskIndex]);
  // Respond with the newly created task
 
 /*
  const completed = req.body.completed;
  tasks[taskIndex].completed = req.body.completed;
  res.json(tasks[taskIndex]);
  updateTaskStatusForUser(username, taskId, completed);

});


app.delete('/users-data/tasks/:id', (req, res) => {
  //When a DELETE request is made to this route, 
  //the server deletes the task with the specified 'id' from the 'tasks' array and responds with a success message in JSON format.
  const taskId = parseInt(req.params.id);
  const username = req.session.username;
  tasks = tasks.filter((task) => task.id !== taskId);

  res.json({ message: 'Task deleted successfully' });
  deleteTaskForUser(username, taskId);
});


app.get("/login", function(req, res){
/*
  if(!req.session.isLoggedIn){
    res.redirect("/login");
    return;
  }

  res.render("login", {error : null});
} );

app.post("/login", function(req, res){
  const username = req.body.username;
  const password = req.body.password;

  const user = getUserByUsername(username);

  if (!user) {
    res.render("login", {error: "Invalid credentials"});
    return;
  }

  if (user.password !== password) {
    res.render("login",{error: "Invalid credentials"});
    return;
  }

  req.session.isLoggedIn = true;
  req.session.username = username;
  res.redirect('/');
});

app.get("/logout", function(req, res) {
  // Clear the session and log the user out
  req.session.destroy(function(err) {
    if (err) {
      console.log(err);
    }
    // Redirect the user to the login page after logout
    res.redirect("/login");
  });
});

// ...

app.get("/signup", function (req, res) {
/*
  if (req.session.isLoggedIn) {
    // If the user is already logged in, redirect to the home page (or any other page)
    res.redirect("/");
    return;
  }

  res.render("signup", {error: null});
});

app.post("/signup", function(req, res){
  const username = req.body.username;
  const password = req.body.password;

  if (checkIfUserExists(username)) {
    res.render("signup", {error: "Username already registered"});
    return;
  }

  // Add the new user
  addUser(username, password);

  res.redirect("login");
});
/*
app.get('/', function (req, res) {
  if (!req.session.isLoggedIn) {
    res.redirect('/login');
    return;
  }

  res.render('index', { username: req.session.username });
});

app.get('/', function (req, res) {
  if (!req.session.isLoggedIn) {
    res.redirect('/login');
    return;
  }

  const username = req.session.username;

  // Read user data from users.json file
  fs.readFile('users.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Internal Server Error');
    }

    const users = JSON.parse(data);

    const user = users.find((user) => user.username === username);

    if (!user) {
      return res.status(404).send('User not found');
    }

    res.render('index', { user }); // Pass user data to the EJS template
  });
});





app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
*/
