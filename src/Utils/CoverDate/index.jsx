const CoverDate = (date, text) => {
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const dateFormat = new Date(date);
  const day = dateFormat.getDate();
  const month = monthNames[dateFormat.getMonth() + 1];
  const year = dateFormat.getFullYear();
  const hour =
    (dateFormat.getHours() < 10 ? "0" : "") + dateFormat.getHours();
  const minute =
    (dateFormat.getMinutes() < 10 ? "0" : "") +
    dateFormat.getMinutes();
  const endFormat = new Date(text.endDate);

  const hourEnd =
    (endFormat.getHours() < 10 ? "0" : "") + endFormat.getHours();
  const minuteEnd =
    (endFormat.getMinutes() < 10 ? "0" : "") + endFormat.getMinutes();
  return `${day} ${month} ${year}, ${hour}:${minute} - ${hourEnd}:${minuteEnd}`;
};

export default CoverDate;
