import ReactDOM from 'react-dom';
import { useState } from 'react';

function Counter({initialCount}) {
  const [count, setCount] = useState(initialCount);

  const addTwo = (prevCount, val) => prevCount + val;

  return (
    <>
      Count: {count}
      <br />
      <button onClick={() => setCount(initialCount)}>Reset</button>
      <button onClick={() => setCount(prevCount => prevCount - 1)}>-</button>
      <button onClick={() => setCount(prevCount => prevCount + 1)}>+</button>
      <button onClick={() => setCount(addTwo(count, 2))}>+2</button>
    </>
  )
}

function ShowSth() {
  const [show, setShow] = useState(false);
  return (
    <>
      <button onClick={() => setShow(true)}>Show Sth</button>
      <div
        onClick={() => setShow(false)}
        style={{ display: (show ? 'block' : 'none') }}>
        Click to hide
      </div>
    </>
  )
}

const App = (props) => {
  return (
    <div>
      <Counter initialCount={0} />
      <hr />
      <ShowSth />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));