import PropTypes from 'prop-types';

CheckAll.propTypes = {
    completeAll: PropTypes.func.isRequired
}

function CheckAll(props) {
  return <div className="button" onClick={() => props.completeAll()}>Check All</div>;
}

export default CheckAll;
