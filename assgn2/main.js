const generateRandomNumber = require("./random.js");

// providing range to the function
const min = 1;
const max = 10;
const randomNumber = generateRandomNumber(min, max);

console.log(`Random number between ${min} and ${max}: ${randomNumber}`);

// we can now perform calculations or operations on this number
