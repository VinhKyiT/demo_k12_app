import { DOMAIN } from './env';

const isDev = false;

const BASE_URL = isDev ? DOMAIN.DEV_BASE_URL : DOMAIN.BASE_URL;

const END_POINTS = {
  AUTH: {
    LOGIN: BASE_URL + '/auth/login',
    PROFILE: BASE_URL + '/auth/profile',
    REFRESH_TOKEN: BASE_URL + '/auth/refresh-token',
  },
  FILES: {
    UPLOAD: BASE_URL + '/files/upload',
    GET_FILE: BASE_URL + '/files',
  },
  USERS: {
    GET_USER: BASE_URL + '/users',
    UPDATE_USER: BASE_URL + '/users',
  },
};

export { END_POINTS };
