import React from 'react'
import Hello from './Hello'
import Counter from './Counter'
import DynamicallyChange from './DynamicallyChange'
import Calculator from './Calculator'
function App() {
  return (
    <div>
      <Hello name="John" />\
      <Counter/>
      <DynamicallyChange/>
      <Calculator/>
    </div>
  )
}

export default App