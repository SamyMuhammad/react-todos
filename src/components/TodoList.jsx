import ItemsRemaining from './ItemsRemaining';
import ClearCompleted from './ClearCompleted';
import CheckAll from './CheckAll';
import TodosListFilters from './TodosListFilters';
import { useContext, useState } from 'react';
import { TodosContext } from '../context/TodosContext';

function TodoList() {
  const { todos, setTodos } = useContext(TodosContext);
  const [todosFilter, setTodosFilter] = useState('all');

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

  function filteredTodos() {
    switch (todosFilter) {
      case 'active':
        return todos.filter(todo => !todo.isCompleted);

      case 'completed':
        return todos.filter(todo => todo.isCompleted);

      default:
        return todos;
    }
  }

  return (
    <>
      <ul className="todo-list">
        {filteredTodos().map((todo, index) => (
          <li key={todo.id} className="todo-item-container">
            <div className="todo-item">
              {todo.isBeingEdited ? (
                <input
                  type="text"
                  className="todo-item-input"
                  autoFocus
                  defaultValue={todo.title}
                  onBlur={event => updateTodo(event, todo.id)}
                  onKeyDown={event => {
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
          <CheckAll />
        </div>
        <ItemsRemaining />
      </div>

      <div className="other-buttons-container">
        <TodosListFilters
          todosFilter={todosFilter}
          setTodosFilter={setTodosFilter}
        />
        <div>
          <ClearCompleted />
        </div>
      </div>
    </>
  );
}

export default TodoList;
