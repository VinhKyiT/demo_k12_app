import axios from 'axios';
import { store } from '../redux/store';
import { refreshTokenApi } from '../services/apis/auth.apis';
import { logout, setToken } from '../redux/auth/auth.actions';
import NavigationServices from './NavigationServices';
import { ROUTES } from '../constants/routes';

const axiosClient = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
});

// Biến (cờ) để kiểm tra xem có đang refresh token hay không
let isRefreshingToken = false;

// Hàm làm mới token
const refreshAccessToken = async () => {
  console.log('call refresh token');
  try {
    const refreshToken = store.getState().auth.refreshToken;
    const response = await refreshTokenApi({
      // Thêm thông tin cần thiết để làm mới token (nếu có)
      refreshToken,
    });
    // Lấy token mới từ phản hồi
    return {
      accessToken: response.data?.access_token,
      refreshToken: response.data?.refresh_token,
    };
  } catch (error) {
    store.dispatch(logout());
    NavigationServices.reset({ routes: [{ name: ROUTES.AUTH_SCREEN }], index: 0 });
    console.error('Error refreshing access token:', error);
  }
};

// Interceptor để thêm token vào tiêu đề của mọi request
axiosClient.interceptors.request.use(
  async config => {
    console.log('Request >>> ', config);
    const token = store.getState().auth.accessToken;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  error => {
    console.log({ error });
    return Promise.reject(error);
  },
);

// Interceptor để xử lý lại request khi gặp lỗi 401 (Unauthorized)
axiosClient.interceptors.response.use(
  response => response.data,
  async error => {
    console.log({ error });
    const originalRequest = error.config;

    if (error?.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshingToken) {
        return;
      }
      originalRequest._retry = true;
      isRefreshingToken = true;

      try {
        const newToken = await refreshAccessToken();

        if (newToken) {
          // Lưu token mới vào Redux và thử lại request ban đầu
          store.dispatch(setToken(newToken));
          originalRequest.headers.Authorization = `Bearer ${newToken}`;

          return axiosClient(originalRequest);
        }
      } catch (err) {
        // Xử lý lỗi khi làm mới token không thành công
        console.error('Error refreshing access token:', err);
        return Promise.reject(err);
      } finally {
        isRefreshingToken = false;
      }
    }

    return Promise.reject(error);
  },
);

export default axiosClient;
