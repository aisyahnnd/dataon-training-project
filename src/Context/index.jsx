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
  const [createStatus, setCreateStatus] = useState(false);
  const CreateDataTraining = async (data) => {
    var messages = t("trainingCreateEditDetail.messageCreate");
    await Axios.post("/trainings", data)
      .then((res) => {
        setCreateStatus(true);
        Notification(messages, "success");
      })
      .catch((error) => {
        Notification(error.message, "warn");
      });
  };

  //for get data detail training
  const [dataDetail, setDataDetail] = useState({});
  const GetDataDetail = async (path, params) => {
    try {
      if (path === "mytraining") {
        const response = await Axios.get(
          `/users/1/trainings/${params}`
        );
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

  //for edit data training
  const EditDataTraining = async (
    path,
    loc,
    dataUpdate,
    paramsId
  ) => {
    try {
      var messages = t("trainingCreateEditDetail.messageUpdate");
      if (path === "mytraining") {
        await Axios.put(`users/1/trainings/${paramsId}`, dataUpdate);
      }
      if (loc === `/training/edit/${paramsId}`) {
        await Axios.put(`trainings/${paramsId}`, dataUpdate);
      }
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

  const GetDataEdit = async (path, loc, params) => {
    try {
      if (path === "mytraining") {
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
      }
      if (loc === `/training/edit/${params}`) {
        const response = await Axios.get(`/trainings/${params}`);
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
      }
    } catch (error) {
      console.log(error);
    }
  };

  //for filter event status
  const [eventStatus, setEventStatus] = useState("");
  //for filter event status
  const [eventType, setEventType] = useState("");
  //for get length data
  const [lengthMyTraining, setLengthMyTraining] = useState();
  const [lengthAllTraining, setLengthAllTraining] = useState();
  //for search training
  const [valueSearchTraining, setValueSearchTraining] = useState("");
  const GetSearchTraining = async (valueSearchTraining) => {
    const myTraining = await Axios.get(
      `/users/1/trainings?search=${valueSearchTraining}`
    );
    const allTraining = await Axios.get(
      `/trainings?search=${valueSearchTraining}`
    );

    Promise.all([myTraining, allTraining]).then(
      ([{ data: dataMyTraining }, { data: dataAllTraining }]) => {
        setDataMyTraining(dataMyTraining);
        setDataAllTrainings(dataAllTraining);
        setValueSearchTraining(valueSearchTraining);
        setLengthMyTraining(dataMyTraining._metadata.total_count);
        setLengthAllTraining(dataAllTraining._metadata.total_count);
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
        setLengthMyTraining(dataUserTraining._metadata.total_count);
        setLengthAllTraining(dataAllTraining._metadata.total_count);
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
        setLengthMyTraining(dataUserTraining._metadata.total_count);
        setLengthAllTraining(dataAllTraining._metadata.total_count);
      }
    );
  };

  //for delete data training
  const [deleteStatus, setDeleteStatus] = useState(false);
  const DeleteDataMyTraining = async (path, id) => {
    if (path === "mytraining") {
      await Axios.delete(`/users/1/trainings/${id}`)
        .then((res) => {
          setDeleteStatus(true);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    if (path === "training") {
      await Axios.delete(`/trainings/${id}`)
        .then((res) => {
          setDeleteStatus(true);
        })
        .catch((error) => {
          console.log(error);
        });
    }
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
        DataMyTraining,
        CreateDataTraining,
        EditDataTraining,
        deleteStatus,
        setDeleteStatus,
        DeleteDataMyTraining,
        GetSearchTraining,
        valueSearchTraining,
        setValueSearchTraining,
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
        createStatus,
        setCreateStatus,
        lengthMyTraining,
        lengthAllTraining,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};
