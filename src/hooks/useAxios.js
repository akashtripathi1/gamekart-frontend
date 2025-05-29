import store from "@/store/store";
import axios from "axios";

export const makeRequest = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
});

//Add a request interceptor to handle Token for every request
makeRequest.interceptors.request.use((config) => {
  const state = store.getState();
  const token = state.auth.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

//Add a response interceptor to handle error for every response
makeRequest.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { response } = error;
    if (response?.status === 401 && window.location.pathname!=="/signin") {
      // Redirect to the signin page on 401 Unauthorized
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      window.location.replace("/signin");
    }
    // Handle other errors or propagate them
    return Promise.reject(error);
  }
);

export const axiosBaseQuery =
  () =>
  async ({ url, method, body, params, headers }) => {
    try {
      const result = await makeRequest({
        url: import.meta.env.VITE_SERVER_URL + url,
        method,
        data: body,
        params,
        headers,
      });
      return { data: result.data };
    } catch (axiosError) {
      let err = axiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };
