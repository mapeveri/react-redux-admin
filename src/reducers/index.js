/**
* Combine the reducers and export the reducer principal
*/
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import Login from './admin/Login';
import Crud from './admin/Crud';

const rootReducer = combineReducers({
    routing: routerReducer,
    Login,
    Crud,
});

export default rootReducer;
