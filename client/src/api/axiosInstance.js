import axios from "axios";
import { getStore } from "../app/storeRef";
import { refreshToken, logoutUser } from "../features/auth/authSlice";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const store = getStore();
    const state = store?.getState()?.auth;

    if (error.response?.status !== 401 || 
        originalRequest._retry || 
        !state?.accessToken) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;
    
    try {
      await store.dispatch(refreshToken());
      const newToken = store.getState().auth.accessToken;
      
      if (newToken) {
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return axiosInstance(originalRequest);
      }
    } catch (refreshError) {
      console.error(refreshError);
      store.dispatch(logoutUser());
    }
    
    return Promise.reject(error);
  }
);
export default axiosInstance;