import axios from "axios";

const base = import.meta.env.MODE === "development" ? "http://localhost:5001/api": "/api"

export const axiosInstance = axios.create({
  baseURL: base,
  withCredentials: true,
});