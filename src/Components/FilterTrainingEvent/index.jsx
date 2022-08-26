import {
  ButtonIcon,
  SelectOption,
  Toggle,
  TextInput,
} from "@/Components";
import {
  UnorderedListOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";
import { useContext, useCallback } from "react";
import { AppContext } from "@/Context";
import { useTranslation } from "react-i18next";
import "./FilterTrainingEvent.css";

const FilterTrainingEvent = () => {
  const { t } = useTranslation(["dashboard"]);
  const {
    view,
    setView,
    debounce,
    eventType,
    setEventType,
    eventStatus,
    setEventStatus,
    setValueSearchTraining,
  } = useContext(AppContext);
  const onClickAsCard = () => {
    setView(true);
  };
  const onClickAsList = () => {
    setView(false);
  };
  const onChangeSearching = (value) => {
    setEventStatus("");
    setEventType("");
    setValueSearchTraining(value);
  };
  const eventChange = (value) => {
    setValueSearchTraining("");
    setEventStatus("");
    setEventType(value);
  };
  const statusChange = (value) => {
    setValueSearchTraining("");
    setEventType("");
    setEventStatus(value);
  };
  const debounceFunc = useCallback(
    debounce(onChangeSearching, 1000),
    []
  );

  return (
    <div className="container-grid-filter">
      <TextInput
        type="search"
        label={t("search.label")}
        placeholder={t("search.placeholder")}
        style={{ width: 230, borderRadius: 5 }}
        onChange={(value) => debounceFunc(value.target.value)}
      />
      <SelectOption
        type="event"
        style={{ width: 230 }}
        onChange={eventChange}
        value={eventType}
      />
      <SelectOption
        type="status"
        style={{ width: 230 }}
        onChange={statusChange}
        value={eventStatus}
      />
      <div className="switch">
        <Toggle label={t("related")}></Toggle>
      </div>
      <div className="wrapperButton">
        <ButtonIcon
          textButton={
            view ? t("buttonView.part2") : t("buttonView.part1")
          }
          style={{ borderRadius: 5, width: 200 }}
          icon={
            view ? <UnorderedListOutlined /> : <AppstoreOutlined />
          }
          onClick={view ? onClickAsList : onClickAsCard}
        />
      </div>
    </div>
  );
};

export default FilterTrainingEvent;
