import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const LinkEvent = ({ title, id, userId }) => {
  return (
    <>
      {userId ? (
        <Link to={`/mytraining/${id}`}>{title}</Link>
      ) : (
        <Link to={`/training/${id}`}>{title}</Link>
      )}
    </>
  );
};

export default LinkEvent;

LinkEvent.propTypes = {
  title: PropTypes.string,
  id: PropTypes.string,
  userId: PropTypes.string,
};
LinkEvent.defaultProps = {
  title: "eventName",
  id: "1",
  userId: "1",
};
