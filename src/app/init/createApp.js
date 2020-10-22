import React from 'react';
import { Provider } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import map from 'lodash/map';

import routes from './routes';

const createApp = (store, history) => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        {map(routes, (route, idx) => (
          <Route key={idx} {...route} />
        ))}
        <Route render={() => <div>404</div>} />
      </Switch>
    </ConnectedRouter>
  </Provider>
);

export default createApp;
