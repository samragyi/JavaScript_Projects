// Function to generate random number
function randomNumber(min, max) {
	return Math.random() * (max - min) + min;
}

// exporting the function
module.exports = randomNumber;
