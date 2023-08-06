import { useState } from 'react';
import PropTypes from 'prop-types';

function TodoForm(props) {
  const [inputTodo, setInputTodo] = useState('');

  function handleInputTodo(event) {
    setInputTodo(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (inputTodo.trim().length === 0) {
      return;
    }

    props.addTodo(inputTodo);

    setInputTodo('');
  }

  return (
    <form action="#" onSubmit={handleSubmit}>
      <input
        type="text"
        value={inputTodo}
        onChange={handleInputTodo}
        className="todo-input"
        placeholder="What do you need to do?"
      />
    </form>
  );
}

TodoForm.propTypes = {
  addTodo: PropTypes.func.isRequired
}

export default TodoForm;
