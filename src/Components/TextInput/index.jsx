import { Input } from "antd";
import "./TextInput.css";
import PropTypes from "prop-types";

const TextInput = ({
  id,
  label,
  placeholder,
  style,
  onChange,
  value,
}) => {
  return (
    <div>
      {label && <p className="label">{label}</p>}
      <Input
        id={id}
        style={style}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        data-testid="inputSearch"
      ></Input>
    </div>
  );
};

export default TextInput;

TextInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  style: PropTypes.object,
};

TextInput.defaultProps = {
  id: "input-text",
  placeholder: "input",
  style: "",
};
