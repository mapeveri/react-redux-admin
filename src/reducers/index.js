/**
* Combine the reducers and export the reducer principal
*/
import { combineReducers } from 'redux';
import {reducer as formReducer} from 'redux-form';
import { routerReducer } from 'react-router-redux';

import Login from './admin/Login';
import Crud from './admin/Crud';

const rootReducer = combineReducers({
    routing: routerReducer,
    form: formReducer,
    Login,
    Crud,
});

export default rootReducer;
