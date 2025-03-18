import React, { useState } from 'react'

function DynamicallyChange() {
    const [data,setData]=useState("");
  return (
    <div>
      <h3>  Enter       </h3>
      <input type='text' onChange={(e)=>setData(e.target.value)}></input>
      <h3>  Displayed Text  </h3>
      <p>{data}</p>
    </div>
  )
}

export default DynamicallyChange