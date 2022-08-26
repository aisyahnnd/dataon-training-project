import { LabelSection, TableData } from "@/Components";
import { AppContext } from "@/Context";
import { useContext } from "react";
import { useTranslation } from "react-i18next";

const MyTrainingEventTable = ({ dataTable, columns }) => {
  const { t } = useTranslation(["dashboard"]);
  const { lengthMyTraining } = useContext(AppContext);

  return (
    <div className="site-card-wrapper">
      <LabelSection
        label={t("myTrainingEvent")}
        dataBadge={lengthMyTraining}
        style={{
          backgroundColor: "#e7e7e7",
          color: "#2db7f5",
          fontWeight: "bold",
        }}
      />

      <TableData
        dataTable={dataTable}
        pagination={{ defaultPageSize: 2 }}
        columns={columns}
      />
    </div>
  );
};

export default MyTrainingEventTable;
