import { useRootStore } from '../../store';
import { observer } from 'mobx-react-lite';
import classnames from 'classnames';
import { useEffect, useRef } from 'react';

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

const TodoEditing = observer(({ todo }) => {
  const { modifyTodoIsEditing, title }  = todo;

  return (
    <label onDoubleClick={ modifyTodoIsEditing }>{ title }</label>
  )
});

const Editing = observer(({ todo }) => {
  const ref = useRef(null);
  const { isEditing, modifyTodoTitle } = todo;

  useEffect(() => {
    if (isEditing) {
      ref.current.focus();
    }
  }, [ isEditing ])

  return (
    <input
      ref={ref}
      className='edit'
      defaultValue={ todo.title }
      onBlur={ () =>  modifyTodoTitle(ref.current.value)}
    />
  )
});

const Todo = observer(({ todo }) => {
  const classname = classnames({
    "completed": todo.isCompleted,
    "editing": todo.isEditing
  });

  return (
    <li
      className={classname}
    >
      <div>
        <TodoCompleted todo={ todo } />
        <TodoEditing todo={ todo } />
        <TodoRemove id={ todo.id } />
      </div>
      <Editing todo={ todo } />
    </li>
  )
});

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