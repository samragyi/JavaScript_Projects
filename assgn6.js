// execute shell commands entered by user
const childProcess = require("child_process");
const readline = require("readline");

let command = null;

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });


function promptUser() {
  rl.question('Enter a shell command (or "exit" to quit): ', (command) => {
    if (command === 'exit') {
      rl.close();
      return;
    }
    shellExec(command);
    promptUser();
  });
}

function shellExec(command){
    //const [cmd, ...args] = command.split(' ');

    const child = childProcess.spawn(command, {shell: true});
    
if(process.platform == "win32"){
    //command = childProcess.spawn("cmd", ["/c","dir"]);

child.stdout.on('data', function(data){

    console.log(data.toString());
});

child.stderr.on('data', function(data){
    console.error(data.toString());
});

child.on("close", function(code){
    console.log('child process exited');
});

child.on("error", function(err){
    console.log('child process exited with error');
});

} else{
    command = childProcess.spawn("ls", ["-a"]);
    
    child.stdout.on('data', function(data){

        console.log(data.toString());
    });
    
    child.stderr.on('data', function(data){
        console.error(data.toString());
    });

    child.on("close", function(code){
        console.log("child process exited with code ${code}");
    });

    child.on("error", function(err){
         console.log('child process exited with error ${err}');
    });

    }
}

promptUser();