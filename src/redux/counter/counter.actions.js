import { DOMAIN } from '../../constants/env';
import axiosClient from '../../utils/axiosClient';
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
    axiosClient
      .get(DOMAIN.DEV_BASE_URL + '/auth/profile')
      .then(response => {
        const data = response;
        dispatch(fetchDataSuccess(data));
      })
      .catch(error => {
        dispatch(fetchDataFailed(error.message));
      });
  };
};
