import axios from "axios";

const Axios = axios.create({
  baseURL: "https://62e11276fa99731d75cd2606.mockapi.io/api/v2",
});

export default Axios;
