import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import map from 'lodash/map';

import routes from './routes';

const createApp = (store) => (
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        {map(routes, (route, idx) => (
          <Route key={idx} {...route} />
        ))}
      </Switch>
    </BrowserRouter>
  </Provider>
);

export default createApp;
