import { useContext } from "react";
import { TodosContext } from "../context/TodosContext";

function CheckAll() {
  const {todos, setTodos} = useContext(TodosContext);

  function completeAll() {
    setTodos(
      todos.map(todo => {
        todo.isCompleted = true;
        return todo;
      })
    );
  }

  return <div className="button" onClick={() => completeAll()}>Check All</div>;
}

export default CheckAll;
