import React from 'react';
import ReactDOM from 'react-dom';
import ReactReduxAdmin  from '../../src';
import models from './models';

let divPoint = document.getElementById('app');
let data = {
    models: models,
    api: 'http://localhost:5000/api/v1/',
    name_admin: 'Admin test',
    pagination: 5,
}

ReactDOM.render(
    <ReactReduxAdmin data={data} />, divPoint
)
