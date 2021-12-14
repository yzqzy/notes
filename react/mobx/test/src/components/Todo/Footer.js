import { useRootStore } from '../../store';
import { observer } from 'mobx-react-lite';

const UnCompletedTodoCount = observer(() => {
  const { todoStore } = useRootStore();
  const { unCompletedTodosCount } = todoStore;
  
  return (
    <strong>{ unCompletedTodosCount }</strong>
  )
});

function Footer () {
  return (
    <UnCompletedTodoCount />
  )
}

export default Footer;
