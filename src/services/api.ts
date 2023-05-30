import axios from "axios";

// Axios instace to access api routes
export const api = axios.create({
  baseURL: "/api",
});
