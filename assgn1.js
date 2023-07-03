/*Create a Node.js program that takes two numbers as 
input from the command line and performs arithmetic operations on them (e.g., addition, subtraction).
*/

function getInput() {
    process.stdin.setEncoding('utf8');
    process.stdin.on('data', function (data) {
      const inputs = data.trim().split(' '); // spliting the input stream to get two inputs
  
      // Process the inputs
        // type conversion
        var num1 = parseInt(inputs[0])
        var num2 = parseInt(inputs[1])
        // check whether an alphabet is entered
        if(!Number.isInteger(num1) || !Number.isInteger(num2)){
            console.log("Enter valid inputs");
        }

        else{
            console.log('You entered these numbers...')
            console.log(num1)
            console.log(num2)
            
            console.log("Performing Arithmetic Operations...");
            var sum = num1+num2;
            var sub = num1-num2;
            var mul = num1*num2;
            var divide = num1/num2;
            
            console.log('Sum: ', sum);
            console.log('Difference: ', sub);
            console.log('Multiplication Product: ', mul);
            console.log('Quotient after divison: ', divide);
        }
      // Exit the program
      process.exit();
    });
  
    // Prompt the user for input
    console.log('Enter two integer values separated by space:');
  }

getInput(); // function calling
  