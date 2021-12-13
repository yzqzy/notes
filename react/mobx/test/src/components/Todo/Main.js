import { useRootStore } from '../../store';
import { observer } from 'mobx-react-lite';

const TodoCompleted = observer(({ todo }) => {
  const { isCompleted, modifyTodoIsCompleted } = todo;

  return (
    <input
      type="checkbox"
      checked={ isCompleted }
      onChange={ modifyTodoIsCompleted }
    />
  )
});

const TodoRemove = observer(({ id }) => {
  const { todoStore } = useRootStore();
  const { removeTodo } = todoStore;

  return (
    <button onClick={ () => removeTodo(id) } >Delete</button>
  )
});

function Todo ({ todo }) {
  return (
    <li>
      <TodoCompleted todo={ todo } />
      <label>{ todo.title }</label>
      <TodoRemove id={ todo.id } />
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