import { createContext, useState } from "react";
import { columnsAllTraining } from "@/Utils/ColumnsAllTraining";
import { columnsMyTraining } from "@/Utils/ColumnsMyTraining";
import { Notification } from "@/Components";
import { Axios } from "@/Utils";

export const AppContext = createContext(null);

export const ContextWrapper = (props) => {
  const [AllTrainingTableColumnContext] = useState(
    columnsAllTraining
  );
  const [MyTrainingTableColumnContext] = useState(columnsMyTraining);

  // for toggle switch view
  const [view, setView] = useState(false);

  //for get data all training
  const [DataAllTrainings, setDataAllTrainings] = useState([]);
  const GetAllTraining = async () => {
    const response = await Axios.get("/trainings");
    setDataAllTrainings(response.data);
  };

  //for get data my training
  const [DataMyTraining, setDataMyTraining] = useState([]);
  const GetMyTraining = async () => {
    const response = await Axios.get(`/users/1/trainings`);
    setDataMyTraining(response.data);
  };

  //for create data training
  const CreateDataTraining = async (data) => {
    try {
      var messages = "Event successfully created";
      const response = await Axios.post("/trainings", data);
      Notification(messages, "success");
    } catch (error) {
      Notification(error.message, "warn");
    }
  };

  //for edit data my training
  const EditDataTraining = async (dataEdit, paramsId, userId) => {
    try {
      var messages = "Event successfully Update";
      const response = await Axios.put(
        `users/${userId}/trainings/${paramsId}`,
        dataEdit
      );
      Notification(messages, "success");
    } catch (error) {
      Notification(error.message, "warn");
    }
  };

  //for searching input filter
  const [valueInputSearching, setValueInputSearching] = useState("");
  //for filter event status
  const [eventStatus, setEventStatus] = useState("");
  //for filter event status
  const [eventType, setEventType] = useState("");
  //get data searching
  const GetDataSearching = async (valueInputSearching) => {
    let endpoints = [
      `/users/1/trainings?search=${valueInputSearching}/`,
      `/trainings?search=${valueInputSearching}`,
    ];
    await Promise.all(
      endpoints.map((endpoint) => Axios.get(endpoint))
    ).then(
      ([{ data: dataUserTraining }, { data: dataAllTraining }]) => {
        setDataAllTrainings(dataAllTraining);
        setDataMyTraining(dataUserTraining);
      }
    );
  };

  //for filter select type event
  const GetDataSelectEventType = async (eventType) => {
    let endpoints = [
      `/users/1/trainings?isOnlineClass=${eventType}`,
      `/trainings?isOnlineClass=${eventType}`,
    ];
    await Promise.all(
      endpoints.map((endpoint) => Axios.get(endpoint))
    ).then(
      ([{ data: dataUserTraining }, { data: dataAllTraining }]) => {
        setDataAllTrainings(dataAllTraining);
        setDataMyTraining(dataUserTraining);
      }
    );
  };

  const GetDataSelectEventStatus = async (eventStatus) => {
    let endpoints = [
      `/users/1/trainings?isComplete=${eventStatus}`,
      `/trainings?isComplete=${eventStatus}`,
    ];
    await Promise.all(
      endpoints.map((endpoint) => Axios.get(endpoint))
    ).then(
      ([{ data: dataUserTraining }, { data: dataAllTraining }]) => {
        setDataAllTrainings(dataAllTraining);
        setDataMyTraining(dataUserTraining);
      }
    );
  };

  //for delete data my training
  const [deleteStatus, setDeleteStatus] = useState(false);
  const DeleteDataMyTraining = async (id) => {
    await Axios.delete(`/users/1/trainings/${id}`)
      .then((res) => {
        console.log(res.data);
        setDeleteStatus(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //for search card training
  const [valueCardTraining, setValueCardTraining] = useState("");
  const SearchCardTraining = async (valueCardTraining) => {
    const myTraining = await Axios.get(
      `/users/1/trainings?search=${valueCardTraining}`
    );
    const allTraining = await Axios.get(
      `/trainings?search=${valueCardTraining}`
    );

    Promise.all([myTraining, allTraining]).then(
      ([{ data: dataMyTraining }, { data: dataAllTraining }]) => {
        setDataMyTraining(dataMyTraining);
        setDataAllTrainings(dataAllTraining);
        setValueCardTraining(valueCardTraining);
      }
    );
  };

  //debounce
  const debounce = (func, delay) => {
    let timer;
    return function (...args) {
      const context = this;
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        func.apply(context, args);
      }, delay);
    };
  };

  return (
    <AppContext.Provider
      value={{
        AllTrainingTableColumnContext,
        MyTrainingTableColumnContext,
        view,
        setView,
        GetAllTraining,
        GetMyTraining,
        DataAllTrainings,
        CreateDataTraining,
        DataMyTraining,
        EditDataTraining,
        valueInputSearching,
        setValueInputSearching,
        GetDataSearching,
        deleteStatus,
        setDeleteStatus,
        DeleteDataMyTraining,
        SearchCardTraining,
        valueCardTraining,
        setValueCardTraining,
        debounce,
        eventStatus,
        setEventStatus,
        eventType,
        setEventType,
        GetDataSelectEventType,
        GetDataSelectEventStatus,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};
