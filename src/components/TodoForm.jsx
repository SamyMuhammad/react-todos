import { useContext, useState } from 'react';
import { TodosContext } from '../context/TodosContext';

function TodoForm() {
  const {todos, setTodos, todoId, setTodoId} = useContext(TodosContext);

  const [inputTodo, setInputTodo] = useState('');

  function addTodo(event) {
    event.preventDefault();

    if (inputTodo.trim().length === 0) {
      return;
    }

    setTodos([
      ...todos,
      {
        id: todoId,
        title: inputTodo,
        isCompleted: false,
        isBeingEdited: false,
      },
    ]);

    setTodoId(prevId => prevId + 1);

    setInputTodo('');
  }

  return (
    <form action="#" onSubmit={addTodo}>
      <input
        type="text"
        value={inputTodo}
        onChange={(event) => setInputTodo(event.target.value)}
        className="todo-input"
        placeholder="What do you need to do?"
      />
    </form>
  );
}

export default TodoForm;
