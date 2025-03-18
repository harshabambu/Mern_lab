import React from 'react'
import { useCounter } from './CounterContext'
function App() {
  const {Count,setCount}=useCounter()
  return (
    <div>
       <h2>Count: {Count}</h2>
       <button onClick={()=>setCount(Count+1)}>Increment</button>
       <button onClick={()=>setCount(Count-1)}>Decrement</button>
    </div>
  )
}

export default App
