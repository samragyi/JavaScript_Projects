const fs = require('fs');
const http = require('http');
const axios = require('axios');
const path = require('path');

async function makeApiRequest(url) {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(`Error making request to ${url}:`, error.message);
    return null;
  }
}

async function processUrlsFromFile(filename) {
  try {

    const data = fs.readFileSync(filename, 'utf-8');


    const lines = data.split('\n').filter(line => line.trim() !== '');


    const promises = lines.map(async (line, index) => {
      const response = await makeApiRequest(line.trim());
      if (response !== null) {

        const responseData = JSON.stringify(response);

        
        const responseFilename = `response_${index + 1}.txt`;
        const filePath = path.join(__dirname, responseFilename); // __dirname is used to keep the file in the current directory
        fs.writeFileSync(filePath, responseData);
        console.log(`Response for ${line} written to ${responseFilename}`);
      }
    });


    await Promise.all(promises);

    console.log('All requests processed successfully.');
  } catch (error) {
    console.error('An error occurred:', error);
  }
}


const filename = './assgn5/urls.txt';
processUrlsFromFile(filename);
