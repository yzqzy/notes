import { observer } from "mobx-react-lite";
import { useRootStore } from "../store";

function Counter () {
  const { counterStore } = useRootStore();
  const { count, increment, decrement } = counterStore;

  return (
    <div>
      <button onClick={ increment }>+</button>
      <span>{ count }</span>
      <button onClick={ decrement }>-</button>
    </div>
  )
}

export default observer(Counter);
