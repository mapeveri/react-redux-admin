import Bootstrap from 'bootstrap/dist/css/bootstrap.css';

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Route, Router, useRouterHistory } from 'react-router';
import { createHashHistory } from 'history';

import configureStore from './store';
import Login from './containers/admin/Login';

import {parseDataAdmin} from './utils/utils';

const store = configureStore();
const history = useRouterHistory(createHashHistory)({ queryKey: false })


/*
  Main component of react-redux-admin
*/
export default class ReactReduxAdmin extends Component {
    constructor(props, context) {
      super(props, context);
    }

    render() {
        //Parse models.js
        let data = parseDataAdmin(this.props.data);
        return (
            <Provider store={store}>
                <Router history={history}>
                    <Route>
                        <Route path="/" data={data} component={Login} />
                    </Route>
                </Router>
            </Provider>
        );
    }
}

ReactReduxAdmin.propTypes = {
    data: React.PropTypes.object.isRequired
};
