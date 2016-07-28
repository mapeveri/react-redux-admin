/*
Combina los reducers y exporta el reducer principal
de la app social
*/
import { combineReducers } from 'redux';
import {reducer as formReducer} from 'redux-form';

import Login from './admin/Login';

const rootReducer = combineReducers({
    form: formReducer,
    Login
});

export default rootReducer;
