import API from "../api";

// Register
export const registerUser = (data) =>
  API.post("/users/register", data);

// Login
export const loginUser = (data) =>
  API.post("/users/login", data);