import '../reset.css';
import '../App.css';
import { useState } from 'react';
import NoTodos from './NoTodos';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import useLocalStorage from '../hooks/useLocalStorage';

function App() {
  const [todos, setTodos] = useLocalStorage('todos', []);

  const [todosFilter, setTodosFilter] = useState('all');

  const [todoId, setTodoId] = useLocalStorage('todoId', 1);

  function addTodo(todoTitle) {
    setTodos([
      ...todos,
      {
        id: todoId,
        title: todoTitle,
        isCompleted: false,
        isBeingEdited: false,
      },
    ]);

    setTodoId(prevId => prevId + 1);
  }

  function filteredTodos() {
    switch (todosFilter) {
      case 'all':
        return todos;

      case 'active':
        return todos.filter(todo => !todo.isCompleted);

      case 'completed':
        return todos.filter(todo => todo.isCompleted);

      default:
        return todos;
    }
  }

  return (
    <div className="todo-app-container">
      <div className="todo-app">
        <h2>Todo App</h2>
        <TodoForm addTodo={addTodo} />
        {todos.length ? (
          <TodoList todos={todos} setTodos={setTodos} todosFilter={todosFilter} setTodosFilter={setTodosFilter} filteredTodos={filteredTodos}/>
        ) : (
          <NoTodos />
        )}
      </div>
    </div>
  );
}

export default App;
