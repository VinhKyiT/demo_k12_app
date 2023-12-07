import { END_POINTS } from '../../constants/endpoints';
import axiosClient from '../../utils/axiosClient';

export const uploadFileApi = data => {
  return axiosClient.post(END_POINTS.FILES.UPLOAD, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
