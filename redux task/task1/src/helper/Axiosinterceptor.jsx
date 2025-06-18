import axios from "axios";

// Axios instance
const axiosInstance = axios.create({
  baseURL: "https://node-js-wse4.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token 
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      
      localStorage.removeItem("token"); 
    //  window.location.href = "/"; 
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
