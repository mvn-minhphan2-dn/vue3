import { getToken } from "@/helpers/auth.helper";
import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:1337/api",
  headers: {
    "Content-Type": "application/json",
  },
});
const axiosClientFilm = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    "Content-Type": "application/json",
  },
});
(axiosClient || axiosClientFilm).interceptors.request.use(
  async function (config) {
    const getAccessToken = getToken();
    if (getAccessToken) {
      config.headers!.Authorization = `Bearer ${getAccessToken}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

(axiosClient || axiosClientFilm).interceptors.response.use(
  async function (response) {
    return response?.data;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export { axiosClient, axiosClientFilm };
