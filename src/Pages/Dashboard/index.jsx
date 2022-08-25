import React, { Suspense } from "react";
import { useContext, useEffect } from "react";
import { AppContext } from "@/Context";
import {
  FilterTrainingEvent,
  MyTrainingEvent,
  AllTrainingEventTable,
  MyTrainingEventTable,
  SectionHeader,
  Loading,
} from "@/Components";
const AllTrainingEvent = React.lazy(() =>
  import("@/Components/AllTrainingEvent/index.jsx")
);

const Dashboard = () => {
  const {
    view,
    DataAllTrainings,
    DataMyTraining,
    AllTrainingTableColumnContext,
    MyTrainingTableColumnContext,
    deleteStatus,
    eventType,
    eventStatus,
    GetDataSelectEventType,
    GetDataSelectEventStatus,
    GetSearchTraining,
    valueSearchTraining,
  } = useContext(AppContext);

  useEffect(() => {
    GetSearchTraining(valueSearchTraining);
  }, [valueSearchTraining, deleteStatus]);

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
          <Suspense fallback={<Loading />}>
            <AllTrainingEvent item={DataAllTrainings} />
          </Suspense>
        </>
      ) : (
        <>
          <MyTrainingEventTable
            dataTable={DataMyTraining.data}
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
