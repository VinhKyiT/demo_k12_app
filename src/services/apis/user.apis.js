import { END_POINTS } from '../../constants/endpoints';
import axiosClient from '../../utils/axiosClient';

export const updateUserApi = data => {
  return axiosClient.put(END_POINTS.USERS.UPDATE_USER + `/${data.userId}`, data.payload);
};
