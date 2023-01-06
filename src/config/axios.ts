import axiosPackage from "axios";

const axiosInstance = axiosPackage.create({
  baseURL: import.meta.env.VITE_ENDPOINT_URL,
});

axiosInstance.interceptors.response.use(({ data }) => data);

export const axios = axiosInstance;
