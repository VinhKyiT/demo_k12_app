import axios from 'axios';
import { END_POINTS } from '~constants/endpoints';
import axiosClient from '~utils/axiosClient';

export const loginApi = data => {
  return axiosClient.post(END_POINTS.auth.login, data);
};

export const getProfileApi = config => {
  return axiosClient.get(END_POINTS.auth.profile, config);
};

export const refreshTokenApi = (data, config) => {
  return axios.post(END_POINTS.auth.refreshToken, data, config);
};
