import axios from "axios";
import StorageService from "./StorageService";
import { BASE_URL, TOKEN_KEY } from "./data";

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  // timeout: 10000,
});

// add interceptor for auth
axiosInstance.interceptors.request.use(
  (config) => {
    const token = StorageService.get(TOKEN_KEY);
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
