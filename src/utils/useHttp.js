import axios from "axios";
import { API_URL } from "../AppConstant";


export function useHttp({ config, headers } = {}) {
  const headerConfig = {
    Accept: "application/json",
    // "Content-Type": "application/json, multipart/form-data",

    ...headers,
  };

  const axiosInstance = axios.create({
    headers: headerConfig,
    baseURL: API_URL,
    timeout: 30 * 1000,
    ...config,
  });

  axiosInstance.interceptors.response.use(
    (response) => {
      const data = response?.data;
      if (typeof data === "string" && (data.includes("doctype html") || data.includes("<!"))) {
        throw new Error("Service unavailable, please contact support");
      }

      return response;
    },
    (error) => {
      const DATA = error?.response?.data; //these are coming from API response 
      const MESSAGE = DATA?.MESSAGE || "An error occurred";
      const STATUS = DATA?.STATUS || "Unknown";


      // Create a custom Error object
      const customError = new Error(MESSAGE);
      customError.status = STATUS;
      customError.originalError = error; // Attach original error if needed

      return Promise.reject(customError);
    }
  );

  return axiosInstance;
}