import { Select } from "antd";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import "./SelectOption.css";

const SelectOption = ({
  type,
  style,
  onChange,
  value,
  defaultValue,
}) => {
  const { t } = useTranslation(["dashboard"]);
  const { Option } = Select;
  const label = {
    event: t("type"),
    status: t("status.label"),
  };

  return (
    <div>
      <p className="label">
        {type === "status" ? label.status : label.event}
      </p>
      <div>
        <Select
          onChange={onChange}
          showSearch
          optionFilterProp="children"
          style={style}
          value={value}
          defaultValue={defaultValue}
          placeholder={
            type === "status"
              ? `Select ${label.status}`
              : `Select ${label.event}`
          }
          data-testid="selectBox"
        >
          {type === "status" ? (
            <>
              <Select.Option value="true">
                {t("status.option.part1")}
              </Select.Option>
              <Select.Option value="false">
                {t("status.option.part2")}
              </Select.Option>
            </>
          ) : (
            <>
              <Select.Option value="true">Online</Select.Option>
              <Select.Option value="false">Offline</Select.Option>
            </>
          )}
        </Select>
      </div>
    </div>
  );
};

export default SelectOption;

SelectOption.propTypes = {
  type: PropTypes.string.isRequired,
  style: PropTypes.object,
};
