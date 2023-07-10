// Build a program that retrieves data from an external API
// using the 'https' module, processes the response using streams, and saves it to a file.

// get required modules
const http = require("http");
const fs = require("fs");

// for writing in a file
const saveOutput = './assgn4/data.txt'; // output file
const fileStream = fs.createWriteStream(saveOutput);


const receptor = function(request, response) {
    // getting the data 
  fetch('https://jsonplaceholder.typicode.com/posts/1')
    .then((response) => response.json())
    // write in file
    .then((json) => {
      const data = JSON.stringify(json); // converts JavaScript objects into strings
      
      fileStream.write(data, (error) => {
        if (error) {
          console.error('Error writing to file:', error);
        } else {
          console.log('Data written to file.');
        }
      });
      
      response.end("Data Retrieved.");
    })
};
    
const server = http.createServer(receptor);

server.listen(3000, function() {
  console.log("Server is listening on port 3000");
});
