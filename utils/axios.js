import axios from "axios";
import {  CurrentAPIUrl } from "./envconfigs";

// Create the instance
const axiosInstance = axios.create({
  baseURL:  CurrentAPIUrl,
  headers: {
    Accept: "application/json",
  },
});

// Request Interceptor
// axiosInstance.interceptors.request.use(
//   (config) => {
//     const isFormData = config.data instanceof FormData;

//     config.headers["Content-Type"] = isFormData
//       ? "multipart/form-data"
//       : "application/json";

//     // Example: Add token if available
//     // const token = localStorage.getItem('token');
//     // if (token) config.headers['Authorization'] = `Bearer ${token}`;

//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // Response Interceptor
// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     // You can globally handle errors here
//     console.error("API Error:", error);
//     return Promise.reject(error);
//   }
// );

export default axiosInstance;
