import { LabelSection, TableData } from "@/Components";
import { useTranslation } from "react-i18next";

const MyTrainingEventTable = ({ dataTable, columns }) => {
  const { t } = useTranslation(["dashboard"]);

  return (
    <div className="site-card-wrapper">
      <LabelSection
        label={t("myTrainingEvent")}
        dataBadge={50}
        style={{
          backgroundColor: "#e7e7e7",
          color: "#2db7f5",
          fontWeight: "bold",
        }}
      />
      <TableData
        key={dataTable.id}
        dataTable={dataTable.data}
        pagination={{ defaultPageSize: 2 }}
        columns={columns}
      />
    </div>
  );
};

export default MyTrainingEventTable;
