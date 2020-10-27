import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { connectRouter, routerMiddleware } from 'connected-react-router';

import appReducer from './appSlice';
import loginReducer from '../../views/login/loginSlice';
import outletsReducer from '../../views/outlets/outletsSlice';
import outletDetailReducer from '../../views/outletDetail/outletDetailSlice';

function createStore(history, preloadedState = {}) {
  const store = configureStore({
    reducer: {
      router: connectRouter(history),
      app: appReducer,
      login: loginReducer,
      outlets: outletsReducer,
      outletDetail: outletDetailReducer,
    },
    middleware: [...getDefaultMiddleware(), routerMiddleware(history)],
    preloadedState,
  });

  return store;
}

export default createStore;
