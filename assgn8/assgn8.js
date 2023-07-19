// arithmetic functions

function add(a,b){
    if(a === undefined || b === undefined){
        throw new Error("Invalid arguments");
    }
    if(a === null || b === null){
        throw new Error("Invalid arguments");
    }
    return a+b;
}

function subtract(a,b){
    if(a === undefined || b === undefined){
        throw new Error("Invalid arguments");
    }
    if(a === null || b === null){
        throw new Error("Invalid arguments");
    }
    return a-b;
}

function mul(a,b){
    if(a === undefined || b === undefined){
        throw new Error("Invalid arguments");
    }
    if(a === null || b === null){
        throw new Error("Invalid arguments");
    }
    return a*b;
}

function division(a,b){
    if(a === undefined || b === undefined){
        throw new Error("Invalid arguments");
    }
    if(a === null || b === null){
        throw new Error("Invalid arguments");
    }
    if (b === 0){
        throw new Error("Division by zero is not allowed");
    }
    return a/b;
}

module.exports = {add, 
    subtract,
mul,
division};

division(5,0);