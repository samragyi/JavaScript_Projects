// program to read a file and print it on the console

const fs = require('fs');
/*
// here we have taken file test.txt as an example for the demonstration

function readContent(){
const data  = fs.readFileSync("./assgn3/test.txt", "utf8");
    
console.log(data);
}

readContent();

*/


//using asynchronous programming approach
fs.readFile("./assgn3/test.txt", "utf8", function (err, data){
    if(err){
        console.log("error", err);
    }
    else{
        console.log("data: ", data);
    }
});