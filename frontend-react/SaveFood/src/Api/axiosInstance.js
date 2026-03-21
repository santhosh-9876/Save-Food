import axios from "axios";

const baseURL = import.meta.env.VITE_BACKEND_BASE_API || "http://127.0.0.1:8000";
console.log("🔧 Backend URL:", baseURL);
console.log("🔧 Environment Variable:", import.meta.env.VITE_BACKEND_BASE_API);

const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("access_token");

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    if (!error.response) return Promise.reject(error);

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem("refresh_token");

      if (!refreshToken) {
        localStorage.clear();
        window.location.href = "/login";
        return Promise.reject(error);
      }

      try {
        console.log("🔄 Refreshing access token...");
        
        const res = await axios.post(`${baseURL}/user/token/refresh/`, {
          refresh: refreshToken,
        });

        const newAccess = res.data.access;
        const newRefresh = res.data.refresh;

        localStorage.setItem("access_token", newAccess);
        
        if (newRefresh) {
          localStorage.setItem("refresh_token", newRefresh);
          console.log("✅ Token refreshed successfully (with new refresh token)");
        } else {
          console.log("✅ Token refreshed successfully");
        }

        originalRequest.headers.Authorization = `Bearer ${newAccess}`;

        return axiosInstance(originalRequest);
      } catch (err) {
        console.log("❌ Token refresh failed, redirecting to login");
        localStorage.clear();
        window.location.href = "/login";
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
