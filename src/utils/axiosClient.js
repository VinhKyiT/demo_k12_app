import axios from 'axios';
import { store } from '../redux/store';
import { setToken } from '../redux/auth/auth.actions';
import { refreshTokenApi } from '../services/apis/auth.apis';

const axiosClient = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
});

const refreshAccessToken = async () => {
  try {
    const refreshToken = store.getState().auth.refreshToken ?? '';
    const response = await axiosClient.post(refreshTokenApi, {
      // Thêm thông tin cần thiết để làm mới token (nếu có)
      refreshToken,
    });

    // Lấy token mới từ phản hồi
    return {
      accessToken: response.access_token,
      refreshToken: response.refresh_token,
    };
  } catch (error) {
    console.error('Error refreshing access token:', error);
    throw error;
  }
};

// Interceptor để thêm token vào tiêu đề của mọi yêu cầu
axiosClient.interceptors.request.use(
  async config => {
    const token = store.getState()?.auth?.accessToken;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

// Interceptor để xử lý lại yêu cầu khi gặp lỗi 401 (Unauthorized)
axiosClient.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const newToken = await refreshAccessToken();

        if (newToken) {
          // Lưu token mới vào Redux và thử lại yêu cầu ban đầu
          store.dispatch(setToken(newToken));
          originalRequest.headers.Authorization = `Bearer ${newToken}`;

          return axiosClient(originalRequest);
        }
      } catch (err) {
        // Xử lý lỗi khi làm mới token không thành công
        console.error('Error refreshing access token:', err);
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  },
);

export default axiosClient;
