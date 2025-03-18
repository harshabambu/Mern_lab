import React, { useState } from 'react'

function Calculator() {
    const [num1,setNum1]=useState(0);
    const [num2,setNum2]=useState(0);
    const [result,setResult]=useState(0);
  return (
    <div>
        <h1>Calculator</h1>
        <input type="number" placeholder="Enter number :" value={num1} onChange={((e)=>setNum1(e.target.value))}/>
        <input type="number" placeholder="Enter number :" value={num2} onChange={((e)=>setNum2(e.target.value))} />
         
         <button onClick={() => setResult(parseFloat(num1) + parseFloat(num2))}>+</button>
         <button onClick={() => setResult(parseFloat(num1) - parseFloat(num2))}>-</button>
         <button onClick={() => setResult(parseFloat(num1) * parseFloat(num2))}>*</button>
         <button onClick={() => setResult(parseFloat(num1) / parseFloat(num2))}>/</button>
         <button onClick={() => setResult(parseFloat(num1) % parseFloat(num2))}>%</button>
         <h3>Result: {result}</h3>

         {/* or use props */}

    </div>
  )
}

export default Calculator