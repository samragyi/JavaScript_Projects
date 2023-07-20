const express = require("express");
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http) // passing the http server here

const PORT = process.env.PORT || 3000  //get port

http.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}`);
});


// using middleware

app.use(express.static(__dirname + '/public'))


app.get('/', (req, res) =>{
    res.sendFile(__dirname +'/index.html');
});

// socket.io ---- socket start


io.on('connection', (socket)=>{
    console.log("User Connected...");

    //listen to the event
    socket.on('message sending', (msg) =>{
        socket.broadcast.emit('message sending', msg);
    });
});

