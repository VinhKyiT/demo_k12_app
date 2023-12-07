import axios from 'axios';
import { END_POINTS } from '../../constants/endpoints';
import axiosClient from '../../utils/axiosClient';

export const loginApi = data => {
  return axios.post(END_POINTS.AUTH.LOGIN, data);
};

export const getProfileApi = config => {
  return axiosClient.get(END_POINTS.AUTH.PROFILE, config);
};

export const refreshTokenApi = data => {
  return axios.post(END_POINTS.AUTH.REFRESH_TOKEN, data);
};
