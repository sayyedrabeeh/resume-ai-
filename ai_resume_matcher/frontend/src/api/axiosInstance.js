// src/api/axiosInstance.js
import axios from "axios";

const backendUrl = "http://localhost:8000"; // your backend base URL

const axiosInstance = axios.create({
  baseURL: backendUrl,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true, // include cookies if needed
});

// Interceptor to refresh token
axiosInstance.interceptors.request.use(
  async (config) => {
    const accessToken = localStorage.getItem("access_token");
    const refreshToken = localStorage.getItem("refresh_token");

    if (accessToken) {
      const tokenData = JSON.parse(atob(accessToken.split(".")[1]));
      const isExpired = tokenData.exp * 1000 < Date.now();

      if (isExpired && refreshToken) {
        try {
          const response = await axios.post(`${backendUrl}/api/token/refresh/`, {
            refresh: refreshToken,
          });

          const newAccess = response.data.access;
          localStorage.setItem("access_token", newAccess);
          config.headers["Authorization"] = `Bearer ${newAccess}`;
        } catch (error) {
          console.error("Token refresh failed", error);
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
        }
      } else {
        config.headers["Authorization"] = `Bearer ${accessToken}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
