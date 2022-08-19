import { Badge } from "antd";
import PropTypes from "prop-types";
import "./LabelSection.css";

const LabelSection = ({ dataBadge, style, label }) => {
  return (
    <div className="title-event">
      <p>
        {label} <Badge style={style} count={dataBadge} />
      </p>
    </div>
  );
};

export default LabelSection;

LabelSection.propTypes = {
  dataBadge: PropTypes.number.isRequired,
  label: PropTypes.string,
  style: PropTypes.object,
};

LabelSection.defaultProps = {
  dataBadge: 10,
  style: "",
  label: "test",
};
