import { INCREMENT_COUNTER } from './counter.constants';
import axios from 'axios';

export const incrementRequest = (amount = 1) => {
  return {
    type: INCREMENT_COUNTER.REQUEST,
    payload: amount,
  };
};

export const incrementSuccess = payload => ({
  type: INCREMENT_COUNTER.SUCCESS,
  payload,
});

export const fetchDataRequest = () => ({
  type: 'FETCH_DATA_REQUEST',
});

export const fetchDataSuccess = data => ({
  type: 'FETCH_DATA_SUCCESS',
  payload: data,
});

export const fetchDataFailed = error => ({
  type: 'FETCH_DATA_FAILED',
  payload: error,
});

// thunk
export const fetchData = () => {
  return dispatch => {
    dispatch(fetchDataRequest());
    axios
      .get('https://store.kybuidev.com/api/v1/categories')
      .then(response => {
        const data = response.data;
        dispatch(fetchDataSuccess(data));
      })
      .catch(error => {
        dispatch(fetchDataFailed(error.message));
      });
  };
};
