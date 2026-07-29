import axios from "axios";


 const apiAxios = axios.create({
 baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

// Default export
export default apiAxios;
