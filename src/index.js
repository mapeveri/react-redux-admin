import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Route, Router, useRouterHistory } from 'react-router';
import { createHashHistory } from 'history';

import configureStore from './store';
import Login from './containers/admin/Login';

const store = configureStore();
const history = useRouterHistory(createHashHistory)({ queryKey: false })


export default class ReactReduxAdmin extends Component {
    constructor(props, context) {
      super(props, context);
    }

    render() {
        return (
            <Provider store={store}>
                <Router history={history}>
                    <Route>
                        <Route path="/" data={this.props.data} component={Login} />
                    </Route>
                </Router>
            </Provider>
        );
    }
}

ReactReduxAdmin.propTypes = {
    data: React.PropTypes.object.isRequired
};
