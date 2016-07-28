import React from 'react';
import { Route } from 'react-router';

import Login from './containers/admin/Login';

export default (
  <Route>
    <Route path="/" component={Login} />
  </Route>
);
