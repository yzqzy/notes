import { observer } from "mobx-react-lite";

function Counter ({ store }) {
  const { count, increment, decrement } = store;

  return (
    <div>
      <button onClick={ increment }>+</button>
      <span>{ count }</span>
      <button onClick={ decrement }>-</button>
    </div>
  )
}

export default observer(Counter);
