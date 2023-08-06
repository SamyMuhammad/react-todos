import '../reset.css';
import '../App.css';
import { useState } from 'react';

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

  const [inputTodo, setInputTodo] = useState('');
  const [todoId, setTodoId] = useState(4);

  function addTodo(event) {
    event.preventDefault();

    if (inputTodo.trim().length === 0) {
      return 0;
    }

    setTodos([
      ...todos,
      {
        id: todoId,
        title: inputTodo,
        isCompleted: false,
      },
    ]);

    setInputTodo('');
    setTodoId(prevId => prevId + 1);
  }

  function handleInputTodo(event) {
    setInputTodo(event.target.value);
  }

  function deleteTodo(todoId) {
    setTodos(todos.filter(todo => todo.id !== todoId));
  }

  function toggleTodo(todoId) {
    setTodos(
      todos.map(todo => {
        if (todo.id === todoId) {
          todo.isCompleted = !todo.isCompleted;
        }
        return todo;
      })
    );
  }

  function markAsBeingEdited(todoId) {
    setTodos(
      todos.map(todo => {
        todo.isBeingEdited = todo.id === todoId;
        return todo;
      })
    );
  }

  function updateTodo(event, todoId) {
    const newTitle = event.target.value;
    const newTodos = todos.map(todo => {
      if (todo.id === todoId && newTitle.trim().length) {
        todo.title = newTitle;
      }
      todo.isBeingEdited = false;
      return todo;
    });
    setTodos(newTodos);
  }

  function cancelEditing(todoId) {
    const newTodos = todos.map(todo => {
      if (todo.id === todoId) {
        todo.isBeingEdited = false;
      }
      return todo;
    });
    setTodos(newTodos);
  }

  return (
    <div className="todo-app-container">
      <div className="todo-app">
        <h2>Todo App</h2>
        <form action="#" onSubmit={addTodo}>
          <input
            type="text"
            value={inputTodo}
            onChange={handleInputTodo}
            className="todo-input"
            placeholder="What do you need to do?"
          />
        </form>

        <ul className="todo-list">
          {todos.map((todo, index) => (
            <li key={todo.id} className="todo-item-container">
              <div className="todo-item">
                {todo.isBeingEdited ? (
                  <input
                    type="text"
                    className="todo-item-input"
                    autoFocus
                    defaultValue={todo.title}
                    onBlur={ (event) => updateTodo(event, todo.id)}
                    onKeyDown={ event => {
                      if (event.key === 'Enter') {
                        updateTodo(event, todo.id);
                      } else if (event.key === 'Escape') {
                        cancelEditing(todo.id);
                      }
                    }}
                  />
                ) : (
                  <span>
                    <input
                      type="checkbox"
                      onChange={() => {
                        toggleTodo(todo.id);
                      }}
                      checked={todo.isCompleted}
                    />
                    <span
                      className={`todo-item-label ${
                        todo.isCompleted ? 'line-through' : ''
                      }`}
                      onDoubleClick={() => markAsBeingEdited(todo.id)}
                    >
                      {todo.title}
                    </span>
                  </span>
                )}
              </div>
              <button
                onClick={() => {
                  deleteTodo(todo.id);
                }}
                className="x-button"
              >
                <svg
                  className="x-button-icon"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </li>
          ))}
        </ul>

        <div className="check-all-container">
          <div>
            <div className="button">Check All</div>
          </div>

          <span>3 items remaining</span>
        </div>

        <div className="other-buttons-container">
          <div>
            <button className="button filter-button filter-button-active">
              All
            </button>
            <button className="button filter-button">Active</button>
            <button className="button filter-button">Completed</button>
          </div>
          <div>
            <button className="button">Clear completed</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
