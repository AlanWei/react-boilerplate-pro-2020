import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { connectRouter, routerMiddleware } from 'connected-react-router';

import loginReducer from '../../views/login/loginSlice';
import homeReducer from '../../views/home/homeSlice';
import userReducer from '../../views/user/userSlice';

function createStore(history, preloadedState = {}) {
  const store = configureStore({
    reducer: {
      router: connectRouter(history),
      login: loginReducer,
      home: homeReducer,
      user: userReducer,
    },
    middleware: [...getDefaultMiddleware(), routerMiddleware(history)],
    preloadedState,
  });

  return store;
}

export default createStore;
