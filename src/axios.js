import axios from "axios";
const instance = axios.create({
  baseURL: "http://127.0.0.1:5001/fir-a56cb/us-central1/api", //API Url (Could Function Url)
});
export default instance;
