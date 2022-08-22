import LabelSection from "@/Components/LabelSection";
import TableData from "@/Components/TableData";
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
      ></LabelSection>
      <TableData
        dataTable={dataTable}
        pagination={{ defaultPageSize: 10 }}
        columns={columns}
      ></TableData>
    </div>
  );
};

export default AllTrainingEventTable;
