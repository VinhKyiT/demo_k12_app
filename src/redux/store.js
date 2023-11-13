import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import rootReducer from './rootReducer';
import logger from 'redux-logger';
import { persistStore } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './rootSaga';
import thunk from 'redux-thunk';

const sagaMiddleware = createSagaMiddleware();

const middlewares = [logger, sagaMiddleware, thunk];

export const store = createStore(rootReducer, applyMiddleware(...middlewares));
export const persistor = persistStore(store);
sagaMiddleware.run(rootSaga);
