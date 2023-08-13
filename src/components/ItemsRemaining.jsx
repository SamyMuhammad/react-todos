import PropTypes from 'prop-types';

ItemsRemaining.propTypes = {
  todos: PropTypes.array.isRequired,
};

function ItemsRemaining(props) {

  const remainingCount = () =>
    props.todos.filter(todo => !todo.isCompleted).length;

  return <span>{remainingCount()} items remaining</span>;
}

export default ItemsRemaining;
