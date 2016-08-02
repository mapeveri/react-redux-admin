/*
Combina los reducers y exporta el reducer principal
de la app social
*/
import { combineReducers } from 'redux';
import {reducer as formReducer} from 'redux-form';

import Login from './admin/Login';
import Crud from './admin/Crud';

const rootReducer = combineReducers({
    form: formReducer,
    Login,
    Crud
});

export default rootReducer;
