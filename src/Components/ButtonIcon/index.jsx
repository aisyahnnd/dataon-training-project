import { Button } from "antd";
import PropTypes from "prop-types";

const ButtonIcon = ({
  textButton,
  style,
  icon,
  onClick,
  type,
  disabled,
}) => {
  return (
    <Button
      data-testid="buttonIcon"
      icon={icon}
      style={style}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {textButton}
    </Button>
  );
};

export default ButtonIcon;

ButtonIcon.propTypes = {
  textButton: PropTypes.string.isRequired,
  style: PropTypes.object,
  icon: PropTypes.object,
};

ButtonIcon.defaultProps = {
  textButton: "Submit",
};
