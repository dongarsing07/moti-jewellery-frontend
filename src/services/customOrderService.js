import API from "../api";

export const createCustomOrder = (formData) => {
  return API.post("/custom-orders", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};