import PropTypes from 'prop-types';

TodosListFilters.propTypes = {
  todosFilter: PropTypes.string.isRequired,
  setTodosFilter: PropTypes.func.isRequired,
};

function TodosListFilters(props) {
  return (
    <div>
      <button
        className={`button filter-button ${
          props.todosFilter === 'all' ? 'filter-button-active' : ''
        }`}
        onClick={() => props.setTodosFilter('all')}
      >
        All
      </button>
      <button
        className={`button filter-button ${
          props.todosFilter === 'active' ? 'filter-button-active' : ''
        }`}
        onClick={() => props.setTodosFilter('active')}
      >
        Active
      </button>
      <button
        className={`button filter-button ${
          props.todosFilter === 'completed' ? 'filter-button-active' : ''
        }`}
        onClick={() => props.setTodosFilter('completed')}
      >
        Completed
      </button>
    </div>
  );
}

export default TodosListFilters;
