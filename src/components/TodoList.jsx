import PropTypes from 'prop-types';

function TodoList(props) {
  function deleteTodo(todoId) {
    props.setTodos(props.todos.filter(todo => todo.id !== todoId));
  }

  function toggleTodo(todoId) {
    props.setTodos(
      props.todos.map(todo => {
        if (todo.id === todoId) {
          todo.isCompleted = !todo.isCompleted;
        }
        return todo;
      })
    );
  }

  function markAsBeingEdited(todoId) {
    props.setTodos(
      props.todos.map(todo => {
        todo.isBeingEdited = todo.id === todoId;
        return todo;
      })
    );
  }

  function updateTodo(event, todoId) {
    const newTitle = event.target.value;
    const newTodos = props.todos.map(todo => {
      if (todo.id === todoId && newTitle.trim().length) {
        todo.title = newTitle;
      }
      todo.isBeingEdited = false;
      return todo;
    });
    props.setTodos(newTodos);
  }

  function cancelEditing(todoId) {
    const newTodos = props.todos.map(todo => {
      if (todo.id === todoId) {
        todo.isBeingEdited = false;
      }
      return todo;
    });
    props.setTodos(newTodos);
  }
  return (
    <>
      <ul className="todo-list">
        {props.todos.map((todo, index) => (
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
    </>
  );
}

TodoList.propTypes = {
  todos: PropTypes.array.isRequired,
  setTodos: PropTypes.func.isRequired,
};

export default TodoList;
