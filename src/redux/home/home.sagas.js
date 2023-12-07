import { call, put, takeLatest } from 'redux-saga/effects';
import { GET_HOME_CATEGORIES } from './home.constants';
import { getHomeCategoriesFailed, getHomeCategoriesSuccess } from './home.actions';
import axiosClient from '../../utils/axiosClient';

export function* handleGetHomeCategories() {
  try {
    const response = yield call(axiosClient.get, 'https://store.kybuidev.com/api/v1/categories');
    yield put(getHomeCategoriesSuccess(response));
  } catch (error) {
    console.log({ error });
    yield put(getHomeCategoriesFailed('Something went wrong!'));
  }
}

export default function* watchHomeSaga() {
  yield takeLatest(GET_HOME_CATEGORIES.REQUEST, handleGetHomeCategories);
}
