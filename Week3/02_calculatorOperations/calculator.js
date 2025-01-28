const calculator = require('./calc');

const readline= require('readline');
const rl=readline.createInterface({
    input:process.stdin,
    output:process.stdout,
})
rl.question("enter first number: ",(xInput)=>{
    rl.question("enter second number: ",(yInput)=>{
        const x=parseFloat(xInput);
        const y=parseFloat(yInput);
        console.log(`Addition: ${calculator.add(x,y)}`);
        console.log(`Subtraction: ${calculator.subtract(x,y)}`);
        console.log(`Multiplication: ${calculator.multiply(x,y)}`); 
        console.log(`Division: ${calculator.divide(x,y)}`);
        rl.close();
    })
})