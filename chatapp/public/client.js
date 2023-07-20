const socket = io();

let username;
let textarea = document.querySelector('#textarea')
let messagearea = document.querySelector('.message__area')

do {
    prompt('Please enter your name: ')
}while(!username)


textarea.addEventListener('keyup', (e) =>{
    if(e.key === 'Enter'){ //check whether enter is pressed
        sendMessage(e.target.value)
    }
});



function sendMessage(message){
    let msg = {
        user: username,
        message: message.trim() //remove whitespace or next line
    }
    //append

    appendMessage(msg, 'outgoing')
    textarea.value = ''
    scrollToBottom();

    //send to server
    socket.emit('message sending',msg)
}

function appendMessage(msg, type){
    let mainDiv = document.createElement('div')
    let className = type;
    mainDiv.classList.add(className, 'message');


    let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `
    mainDiv.innerHTML = markup;  // pass the markup to html div
    messagearea.appendChild(mainDiv);
};

// receiving messages

socket.on('message sending',(msg) =>{
    appendMessage(msg, 'incoming');
    scrollToBottom();
});

function scrollToBottom(){
    messagearea.scrollTop = messagearea.scrollHeight;
}