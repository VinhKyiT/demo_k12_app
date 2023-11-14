import { DOMAIN } from './env';

const isDev = false;
const BASE_URL = isDev ? DOMAIN.DEV_BASE_URL : DOMAIN.BASE_URL;
const END_POINTS = {
  auth: {
    login: BASE_URL + '/auth/login',
    profile: BASE_URL + '/auth/profile',
    refreshToken: BASE_URL + '/auth/refresh-token',
  },
  categories: {
    getAllCategories: BASE_URL + 'categories',
  },
};
export { END_POINTS };
