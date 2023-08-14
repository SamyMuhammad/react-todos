import '../reset.css';
import '../App.css';
import { useState } from 'react';
import NoTodos from './NoTodos';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import useLocalStorage from '../hooks/useLocalStorage';
import { TodosContext } from '../context/TodosContext';

function App() {
  const [todos, setTodos] = useLocalStorage('todos', []);
  const [todoId, setTodoId] = useLocalStorage('todoId', 1);

  return (
    <TodosContext.Provider value={{ todos, setTodos, todoId, setTodoId }}>
      <div className="todo-app-container">
        <div className="todo-app">
          <h2>Todo App</h2>
          <TodoForm />
          {todos.length ? <TodoList /> : <NoTodos />}
        </div>
      </div>
    </TodosContext.Provider>
  );
}

export default App;
