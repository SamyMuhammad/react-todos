import PropTypes from 'prop-types';

ClearCompleted.propTypes = {
    clearCompleted: PropTypes.func.isRequired
}

function ClearCompleted(props) {

  return (
    <div className='button' onClick={() => props.clearCompleted()}>Clear Completed</div>
  )
}

export default ClearCompleted