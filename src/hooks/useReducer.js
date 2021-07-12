import ReactDOM from 'react-dom'
import { useReducer } from 'react';

// const initialCount = {count: 0};

function reducer(state, action) {
  switch (action.type) {
    case 'reset':
      return { count: action.payload };
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      return state
  }
}

function init(initialCount) {
  return { count: initialCount + 100 };
}

function Counter({initialCount}) {
  const [state, dispatch] = useReducer(
    reducer,
    initialCount,
    init
  );

  return (
    <>
      Count: {state.count}
      <br />
      <button onClick={() => dispatch({type: 'reset', payload: initialCount})}>Reset</button>
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
      <button onClick={() => dispatch({type: 'decrement'})}>-</button>
    </>
  )
}

const App = props => <>
  <Counter initialCount={1} />
</>

ReactDOM.render(<App />, document.getElementById('root'));