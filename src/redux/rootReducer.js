import { combineReducers } from 'redux';
import authReducer from './auth/auth.reducers';
import cartReducer from './cart/cart.reducers';

const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
});

export default rootReducer;
