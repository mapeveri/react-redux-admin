import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, useRouterHistory } from 'react-router';
import { createHashHistory } from 'history';

import configureStore from './store';
import routes from './routes';

let divPoint = document.getElementById('app');
const store = configureStore();

const history = useRouterHistory(createHashHistory)({ queryKey: false })

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            {routes}
        </Router>
    </Provider>, divPoint
)
