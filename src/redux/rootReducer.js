import { combineReducers } from 'redux';
import authReducer from './auth/auth.reducers';
import cartReducer from './cart/cart.reducers';
import profileReducers from './profile/profile.reducers';
import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import loadingReducer from './loading/loading.reducers';
import homeReducer from './home/home.reducers';
import counterReducer from './counter/counter.reducers';

const authPersistConfig = {
  key: 'authPersistor',
  storage: AsyncStorage,
};

const cartPersistConfig = {
  key: 'cartPersistor',
  storage: AsyncStorage,
};

const homePersistConfig = {
  key: 'homePersistor',
  storage: AsyncStorage,
};

const profilePersistConfig = {
  key: 'profilePersistor',
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  cart: persistReducer(cartPersistConfig, cartReducer),
  counter: counterReducer,
  home: persistReducer(homePersistConfig, homeReducer),
  loading: loadingReducer,
  profile: persistReducer(profilePersistConfig, profileReducers),
});

export default rootReducer;
