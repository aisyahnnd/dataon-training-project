import PropTypes from "prop-types";
import { Switch } from "antd";

const Toggle = ({ label, style }) => {
  return (
    <div>
      {label && <p className="label">{label}</p>}
      <Switch style={style} />
    </div>
  );
};

export default Toggle;

Toggle.propTypes = {
  label: PropTypes.string.isRequired,
  style: PropTypes.string,
};

Toggle.defaultProps = {
  label: "Label",
};
