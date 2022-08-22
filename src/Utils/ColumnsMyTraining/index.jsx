import { Rate } from "antd";
import CoverDate from "@/Utils/CoverDate";

export const columnsMyTraining = [
  {
    title: "EventName",
    dataIndex: "eventName",
    key: "eventName",
    sorter: (a, b) => a.eventName.localeCompare(b.eventName),
  },
  {
    title: "Training Type",
    dataIndex: "isOnline",
    key: "eventType",

    render: (text) => {
      return <span>{text ? "Online Class" : "Offline Class"}</span>;
    },
  },
  {
    title: "Event Period",
    dataIndex: "startDate",
    key: "eventPeriod",
    sorter: (a, b) => new Date(a.startdate) - new Date(b.StartDate),
    render: CoverDate,
  },
  {
    title: "Trainer Name",
    dataIndex: "speaker",
    key: "speaker",
    sorter: (a, b) => a.speaker.localeCompare(b.speaker),
  },
  {
    title: "Ratings",
    dataIndex: "ratings",
    key: "ratings",
    sorter: (a, b) => a.ratings - b.ratings,
    render: (ratings) => (
      <Rate
        disabled
        allowHalf
        defaultValue={0}
        value={ratings}
      ></Rate>
    ),
  },
  {
    title: "Additional Info",
    dataIndex: "information",
    key: "information",
    sorter: (a, b) => a.information.localeCompare(b.information),
  },
];
