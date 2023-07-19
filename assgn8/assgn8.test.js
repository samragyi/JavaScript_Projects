// Import the calculator module
const { add, subtract, mul, division } = require("./assgn8.js");



// Test cases for addition
test("add two numbers", ()=>{
    expect(add(5,3)).toBe(8);
});

test("should concatenate strings", ()=>{
    expect(add(5,"3")).toBe("53");
});
// Test cases for subtraction

test("subtract two numbers", ()=>{
    expect(subtract(7,2)).toBe(5);
});

// Test cases for multiplication
test("multiply two numbers", ()=>{
    expect(mul(-5,3)).toBe(-15);
});


// Test cases for division
test("divide two numbers", ()=>{
    expect(add(5,3)).toBe(8);
});

test("should throw division by zero error", ()=>{
    expect(division(5,0)).toThrow();
});


// tests for arguments
test("should throw error if invalid arguments are passed", ()=>{
    expect(()=> add()).toThrow();
    expect(()=> subtract()).toThrow();
    expect(()=> mul()).toThrow();
    expect(()=> division()).toThrow();
});

test("should throw error if null is passed", ()=>{
    expect(()=> add(null, null)).toThrow();
    expect(()=> subtract(null, null)).toThrow();
    expect(()=> mul(null, null)).toThrow();
    expect(()=> division(null, null)).toThrow();
});