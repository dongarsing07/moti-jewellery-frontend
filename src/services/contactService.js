import API from "../api";

export const sendMessage = (data) => API.post("/contact", data);