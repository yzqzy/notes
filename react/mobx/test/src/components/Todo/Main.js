import { useRootStore } from '../../store';
import { observer } from 'mobx-react-lite';

function Todo ({ todo }) {
  return (
    <li>
      <label>{ todo.title }</label>
    </li>
  )
}

function Main () {
  const { todoStore } = useRootStore();
  const { todos } =  todoStore;

  return (
    <section>
      <ul>
        {
          todos.map(todo => <Todo todo={ todo } key={ todo.id } />)
        }
      </ul>
    </section>
  )
}

export default observer(Main);