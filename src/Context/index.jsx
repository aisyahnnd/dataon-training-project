import { createContext, useEffect, useState } from "react";
import { columnsAllTraining } from "@/Utils/ColumnsAllTraining";
import { columnsMyTraining } from "@/Utils/ColumnsMyTraining";
import { Notification } from "@/Components";
import { Axios } from "@/Utils";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";

export const AppContext = createContext(null);

export const ContextWrapper = (props) => {
  const { t } = useTranslation(["content"]);
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
      var messages = t("trainingCreateEditDetail.messageCreate");
      const response = await Axios.post("/trainings", data);
      Notification(messages, "success");
    } catch (error) {
      Notification(error.message, "warn");
    }
  };

  //for get data detail training
  const [dataDetail, setDataDetail] = useState({});
  const GetDataDetail = async (path, params) => {
    try {
      if (path === "mytraining") {
        const response = await Axios.get(
          `/users/1/trainings/${params}`
        );
        console.log("bbb", response.data);
        setDataDetail(response.data);
      }
      if (path === "training") {
        const response = await Axios.get(`/trainings/${params}`);
        setDataDetail(response.data);
      }
    } catch (error) {
      console.log("error-message:", error);
    }
  };

  //for edit data my training
  const EditDataTraining = async (dataUpdate, paramsId) => {
    try {
      var messages = t("trainingCreateEditDetail.messageUpdate");
      const response = await Axios.put(
        `users/1/trainings/${paramsId}`,
        dataUpdate
      );
      Notification(messages, "success");
    } catch (error) {
      Notification(error.message, "warn");
    }
  };

  const [dataEdit, setDataEdit] = useState({
    eventName: "",
    startDate: "",
    endDate: "",
    image: "",
    trainer: "",
    location: {},
    ratings: "",
    isOnlineClass: "",
    additionalInfo: "",
    isComplete: "",
    date: "",
    userId: "",
  });

  const GetDataEdit = async (params) => {
    try {
      const response = await Axios.get(
        `/users/1/trainings/${params}`
      );
      setDataEdit({
        eventName: response.data.eventName,
        startDate: dayjs(response.data.startDate).format(
          "YYYY-MM-DD HH:mm"
        ),
        endDate: dayjs(response.data.endDate).format(
          "YYYY-MM-DD HH:mm"
        ),
        image: response.data.thumbnail,
        trainer: response.data.trainer,
        location: {
          lat: response.data.location.lat,
          long: response.data.location.long,
        },
        ratings: response.data.ratings,
        isOnlineClass:
          location.isOnlineClass === true
            ? t("trainingCreateEditDetail.eventType.option1")
            : t("trainingCreateEditDetail.eventType.option2"),
        additionalInfo: response.data.additionalInfo,
        userId: response.data.userId,
      });
    } catch (error) {
      console.log(error);
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
        dataEdit,
        GetDataEdit,
        dataDetail,
        GetDataDetail,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};
