import { useMemo, useContext } from 'react';
import { TodosContext } from '../context/TodosContext';

function ItemsRemaining() {
  const {todos} = useContext(TodosContext);
  const remainingTodosCount = useMemo(() => todos.filter(todo => !todo.isCompleted).length, [todos]);

  return <span>{remainingTodosCount} items remaining</span>;
}

export default ItemsRemaining;
