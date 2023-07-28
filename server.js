const express = require('express');
const bodyParser = require('body-parser');  //body parsing middleware.
const app = express();
const port = 5500;
var session = require("express-session");

let tasks = [];  //Declare an array to store the tasks.
let users = []; //Declare an array to store user details


app.use(bodyParser.urlencoded({ extended: true }));  // use body-parser for url encoded data
app.use(bodyParser.json());                         // use body-parser for json 
app.use(express.static('public'));

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


app.post('/api/tasks', (req, res) => {
  //When a POST request is made to this route, 
  // the server adds a new task to the 'tasks' array and responds with the newly created task in JSON format.
  const newTask = req.body;
  newTask.id = tasks.length + 1;
  newTask.completed = false;
  tasks.push(newTask);
  res.status(201).json(newTask);
});


app.put('/api/tasks/:id', (req, res) => {
// When a PUT request is made to this route, 
//the server updates the completion status of a task based on its 'id', and responds with the updated task in JSON format.
  const taskId = parseInt(req.params.id);
  const taskIndex = tasks.findIndex((task) => task.id === taskId);

  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }

  tasks[taskIndex].completed = req.body.completed;
  res.json(tasks[taskIndex]);
});


app.delete('/api/tasks/:id', (req, res) => {
  //When a DELETE request is made to this route, 
  //the server deletes the task with the specified 'id' from the 'tasks' array and responds with a success message in JSON format.
  const taskId = parseInt(req.params.id);
  tasks = tasks.filter((task) => task.id !== taskId);
  res.json({ message: 'Task deleted successfully' });
});


app.get("/login", function(req, res){
  
  if(!req.session.isLoggedIn){
    res.redirect("/login");
    return;
  }
  
  res.sendFile(__dirname + '/public/login.html');
} );

app.post("/login", function(req, res){

  const username = req.body.username;
  const password = req.body.password;
  for(const user in users){
    if(username === user.username && password === user.password){
      req.session.isLoggedIn = true;
      req.session.username = username;
      res.redirect('/');
      return;
   }
}
  res.status(401).send('error: invalid credentials');

});

app.get("/signup", function(req, res){
  if(!req.session.isLoggedIn){
    res.redirect("/login");
    return;
  }
  res.sendFile(__dirname + "/public/signup.html");
});

app.post("/signup", function(req, res){
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const confirm_password = req.body.confirm_password;
/*
    if(password!== confirm_password){
      res.status(400).send("Passwords do not match");
      return;
    }
    */
    for(const user in users){
      if(user.username === username){
        res.status(400).send("Username already registered");
        return;
      }
    }
    const newUser = {username, password};
    users.push(newUser);
    res.status(200).send("Signed Up successfully");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

