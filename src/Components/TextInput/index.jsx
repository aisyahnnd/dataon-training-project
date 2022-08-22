import { Input } from "antd";
import PropTypes from "prop-types";
import "./TextInput.css";

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
