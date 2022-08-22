import { useContext, useEffect } from "react";
import { AppContext } from "@/Context";
import {
  FilterTrainingEvent,
  MyTrainingEvent,
  AllTrainingEventTable,
  MyTrainingEventTable,
  AllTrainingEvent,
} from "@/Components";
import SectionHeader from "@/Components";

const Dashboard = () => {
  const {
    view,
    valueInputSearching,
    GetDataSearching,
    DataAllTrainings,
    AllTrainingTableColumnContext,
    MyTrainingTableColumnContext,
    DataMyTraining,
    deleteStatus,
    eventType,
    eventStatus,
    GetDataSelectEventType,
    GetDataSelectEventStatus,
  } = useContext(AppContext);

  useEffect(() => {
    GetDataSearching(valueInputSearching);
  }, [valueInputSearching, deleteStatus]);

  useEffect(() => {
    GetDataSelectEventType(eventType);
  }, [deleteStatus, eventType]);

  useEffect(() => {
    GetDataSelectEventStatus(eventStatus);
  }, [deleteStatus, eventStatus]);

  return (
    <>
      <SectionHeader viewButton></SectionHeader>
      <FilterTrainingEvent />
      {view ? (
        <>
          <MyTrainingEvent />
          <AllTrainingEvent item={DataAllTrainings} />
        </>
      ) : (
        <>
          <MyTrainingEventTable
            dataTable={DataMyTraining}
            columns={MyTrainingTableColumnContext}
          />
          <AllTrainingEventTable
            dataTable={DataAllTrainings.data}
            columns={AllTrainingTableColumnContext}
          />
        </>
      )}
    </>
  );
};

export default Dashboard;
