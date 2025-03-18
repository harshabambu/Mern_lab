import React, { useState ,useReducer} from 'react'

function App() {
  const [count,setCount]=useState(0);
  const reducer=(state,action)=>{
    switch(action.type){
      case "increment":
            return {count2:(state.count2+1)}  
      case "decrement":
           return {count2:(state.count2-1)}
          
          }
        }
        const [state,dispatch]=useReducer(reducer,{count2:0});
  return (
    <div>
        <h1>Use State</h1>
        <button onClick={()=>setCount(count+1)}>Increment</button>
        <button onClick={()=>setCount(count-1)}>Decrement</button>
        <h1>{count}</h1>

        <h1>Use Reducer</h1>
        <button onClick={()=>dispatch({type:"increment"})}>Increment</button>
        <button onClick={()=>dispatch({type:"decrement"})}>Decrement</button>
        
        <h1>{state.count2}</h1>

    </div>
  )
}

export default App