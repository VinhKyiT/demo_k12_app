import { GET_HOME_CATEGORIES } from './home.constants';

export const getHomeCategoriesRequest = () => ({
  type: GET_HOME_CATEGORIES.REQUEST,
});

export const getHomeCategoriesSuccess = payload => ({
  type: GET_HOME_CATEGORIES.SUCCESS,
  payload,
});

export const getHomeCategoriesFailed = payload => ({
  type: GET_HOME_CATEGORIES.FAILED,
  payload,
});
