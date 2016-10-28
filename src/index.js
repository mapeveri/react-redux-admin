import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
import BootstrapJs from 'bootstrap/dist/js/bootstrap.js';

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Route, Router, useRouterHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { createHashHistory } from 'history';

import configureStore from './store';
import Login from './containers/admin/Login';
import Dashboard from './containers/admin/Dashboard';

import { generateRoutes, parseDataAdmin } from './utils/utils';

const store = configureStore();
const hashHistory = useRouterHistory(createHashHistory)({ queryKey: false })
const history = syncHistoryWithStore(hashHistory, store);

/**
* Main component of react-redux-admin
*/
export default class ReactReduxAdmin extends Component {
    constructor(props, context) {
      super(props, context);
    }

    render() {
        //Parse models.js
        let data = parseDataAdmin(this.props.data);
        //Generate routes
        let routes = generateRoutes(data);

        return (
            <Provider store={store}>
                <Router history={history}>
                    <Route>
                        <Route path="/" data={data} component={Login} />
                        <Route path="/dashboard" data={this.props.data} component={Dashboard} />
                        { routes }
                    </Route>
                </Router>
            </Provider>
        );
    }
}

ReactReduxAdmin.propTypes = {
    data: React.PropTypes.object.isRequired
};
