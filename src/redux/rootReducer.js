import { combineReducers } from 'redux';
import authReducer from './auth/auth.reducers';
import cartReducer from './cart/cart.reducers';
import profileReducers from './profile/profile.reducers';
import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import loadingReducer from './loading/loading.reducers';

const authPersistConfig = {
  key: 'authPersistor',
  storage: AsyncStorage,
};

const cartPersistConfig = {
  key: 'cartPersistor',
  storage: AsyncStorage,
};

const profilePersistConfig = {
  key: 'profilePersistor',
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  cart: persistReducer(cartPersistConfig, cartReducer),
  loading: loadingReducer,
  profile: persistReducer(profilePersistConfig, profileReducers),
});

export default rootReducer;
