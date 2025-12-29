import axios, { AxiosError, AxiosResponse } from "axios";
import { getBaseUrl } from "./getBaseUrl";
import { store } from "../store/store";

/* ================= BASE CONFIG ================= */

const axiosInstance = axios.create({
  baseURL: getBaseUrl(),
  timeout: 45000,
  headers: {
    "Content-Type": "application/json",
  },
});

/* ================= REQUEST INTERCEPTOR ================= */

axiosInstance.interceptors.request.use(
  (config) => {
    const storeData = store.getState()
    const token = storeData?.auth?.token

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (import.meta.env.DEV) {
      console.log(
        `[API REQUEST] ${config.method?.toUpperCase()} ${config.url}`,
        config
      );
    }

    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

/* ================= RESPONSE INTERCEPTOR ================= */

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    if (import.meta.env.DEV) {
      console.log(
        `[API RESPONSE] ${response.config.url}`,
        response.data
      );
    }

    return response.data;
  },
  (error: AxiosError<any>) => {
    if (import.meta.env.DEV) {
      console.error("[API ERROR]", error);
    }

    if (error.response) {
      const status = error.response.status;

      if (status === 401) {
        console.warn("Unauthorized – redirect to login");
      }

      if (status >= 500) {
        console.error("Server error");
      }

      return Promise.reject(error.response.data);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
