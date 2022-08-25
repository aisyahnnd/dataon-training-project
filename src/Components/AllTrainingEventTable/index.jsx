import { LabelSection, TableData } from "@/Components";
import { useTranslation } from "react-i18next";

const AllTrainingEventTable = ({ dataTable, columns }) => {
  const { t } = useTranslation(["dashboard"]);

  return (
    <div className="site-card-wrapper">
      <LabelSection
        label={t("allTrainingEvent")}
        dataBadge={5}
        style={{
          backgroundColor: "#e7e7e7",
          color: "#2db7f5",
          fontWeight: "bold",
        }}
      />
      <TableData
        dataTable={dataTable}
        pagination={{ defaultPageSize: 10 }}
        columns={columns}
      />
    </div>
  );
};

export default AllTrainingEventTable;
