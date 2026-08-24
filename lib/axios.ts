import axios from "axios";

export const api = axios.create({
  // No proxy — calls the backend directly. Will fail with CORS errors in the
  // browser until the backend sends Access-Control-Allow-Origin headers.
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API request failed:", error?.response?.status, error?.message);
    return Promise.reject(error);
  }
);
