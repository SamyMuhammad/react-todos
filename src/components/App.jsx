import '../reset.css';
import '../App.css';
import { useState } from 'react';
import NoTodos from './NoTodos';
import TodoForm from './TodoForm';
import TodoList from './TodoList';

function App() {
  const [todos, setTodos] = useState([
    {
      id: 1,
      title: 'Finish React Series',
      isCompleted: false,
      isBeingEdited: false,
    },
    {
      id: 2,
      title: 'Go to Grocery',
      isCompleted: true,
      isBeingEdited: false,
    },
    {
      id: 3,
      title: 'Do other thing',
      isCompleted: false,
      isBeingEdited: false,
    },
  ]);

  const [todosFilter, setTodosFilter] = useState('all');

  const [todoId, setTodoId] = useState(4);

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
