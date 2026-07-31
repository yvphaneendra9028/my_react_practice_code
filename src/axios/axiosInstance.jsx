import axios from "axios";


 const apiAxios = axios.create({
 baseURL: "https://my-react-practice-code.onrender.com/api",
  withCredentials: true,
});
//baseURL: "http://localost:5000/api",
//baseURL: "https://my-react-practice-code.onrender.com/api",

// Default export
export default apiAxios;
