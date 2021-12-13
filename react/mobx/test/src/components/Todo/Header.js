import { useState } from "react"
import { useRootStore } from "../../store";

function Header () {
  const [title, setTitle] = useState('');
  const { todoStore } = useRootStore();
  const { addTodo } = todoStore;

  return (
    <header className="header">
      <h1>todos</h1>
      <input
        className="new-todo"
        placeholder="what needs to be done?"
        autoFocus
        value={title}
        onChange={e => {
          setTitle(e.target.value);
        }}
        onKeyUp={e => {
          if (e.key !== 'Enter') return;

          addTodo(title);
          setTitle('');
        }}
      />
    </header>
  )
}

export default Header;