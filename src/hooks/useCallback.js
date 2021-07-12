import ReactDOM from 'react-dom'
import React, { useState, useCallback } from 'react'

function Counter() {
  const [count, setCount] = useState(0);

  const handleCount = () => {
    console.log('Render handle function.');
    setCount(count + 1);
  }
  
  const handleIncrement = useCallback(
    () => {
      console.log('Render Once');
      setCount(count + 1);
    },
    [count],
  );

  return (
    <>
      Counter: {count}
      <button onClick={handleCount}>+</button>
      <button onClick={handleIncrement}>++</button>
    </>
  )
}

ReactDOM.render(<Counter />, document.getElementById('root'));