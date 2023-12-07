import { GET_HOME_CATEGORIES } from './home.constants';

const initialState = {
  categoriesData: {
    data: [],
    error: null,
  },
};

const homeReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_HOME_CATEGORIES.SUCCESS:
      return {
        ...state,
        categoriesData: {
          ...state.categoriesData,
          data: payload,
          error: null,
        },
      };
    case GET_HOME_CATEGORIES.FAILED:
      return {
        ...state,
        categoriesData: {
          ...state.categoriesData,
          data: [],
          error: payload,
        },
      };
    default:
      return state;
  }
};

export default homeReducer;
