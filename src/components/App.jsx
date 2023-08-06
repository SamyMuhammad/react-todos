import '../reset.css';
import '../App.css';
import { useState } from 'react';

function App() {
  const [todos, setTodos] = useState([
    {
      id: 1,
      title: 'Finish React Series',
      isCompleted: false,
    },
    {
      id: 2,
      title: 'Go to Grocery',
      isCompleted: true,
    },
    {
      id: 3,
      title: 'Do other thing',
      isCompleted: false,
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
    setTodos(todos.map(todo => {
      if (todo.id === todoId) {
        todo.isCompleted = ! todo.isCompleted;
      }
      return todo;
    }));
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
                <input type="checkbox"  onClick={ () => {toggleTodo(todo.id)} } checked={todo.isCompleted ? true : false}/>
                <span className={`todo-item-label ${todo.isCompleted ? 'line-through' : ''}`}>{todo.title}</span>
                {/* <input type="text" className="todo-item-input" value="Do other thing /> */}
              </div>
              <button onClick={ () => {deleteTodo(todo.id)} } className="x-button">
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
