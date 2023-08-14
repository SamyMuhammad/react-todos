import { useContext } from "react";
import { TodosContext } from "../context/TodosContext";

function ClearCompleted() {
  const {todos, setTodos} = useContext(TodosContext);

  function clearCompleted() {
    setTodos(todos.filter(todo => !todo.isCompleted));
  }

  return (
    <div className='button' onClick={() => clearCompleted()}>Clear Completed</div>
  )
}

export default ClearCompleted