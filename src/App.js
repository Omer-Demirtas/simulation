import React from "react";
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from './feature/counter/counter'
import counterReducer from './feature/counter/counter'
const App = () => 
{
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
<div>
      <div>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <span>{count}</span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
      </div>
    </div>
  );
}

export default App;