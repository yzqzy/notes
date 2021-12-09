import { observer } from "mobx-react-lite";

function Counter ({ store }) {
  return (
    <div>
      <button onClick={ () => store.increment() }>+</button>
      <span>{ store.count }</span>
      <button onClick={ () => store.decrement() }>-</button>
    </div>
  )
}

export default observer(Counter);
