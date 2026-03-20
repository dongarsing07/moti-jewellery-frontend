import API from "../api";

// Add review
export const addReview = (formData) =>
  API.post("/reviews", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

// Get reviews
export const getReviews = (productId) =>
  API.get(`/reviews/product/${productId}`);