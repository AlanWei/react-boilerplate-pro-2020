import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { connectRouter, routerMiddleware } from 'connected-react-router';

import loginReducer from '../../views/login/loginSlice';

function createStore(history, preloadedState = {}) {
  const store = configureStore({
    reducer: {
      router: connectRouter(history),
      login: loginReducer,
    },
    middleware: [...getDefaultMiddleware(), routerMiddleware(history)],
    preloadedState,
  });

  return store;
}

export default createStore;
