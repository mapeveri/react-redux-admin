import React from 'react';
import { Route } from 'react-router';

import Input from '../components/admin/Input';
import Crud from '../containers/admin/Crud';
import FormCrud from '../containers/admin/FormCrud';

/**
* @method: getSections
* @description: Function that return the sections admin
* @param: models {object} data configuration admin
*/
export function getSections(models) {
    return Object.keys(models);
}

/**
* @method: getModels
* @description: Get models of one section
* @param: models {object} Object with the models
* @param section {string} section to get models
*/
export function getModels(models, section) {
    let arrModels = [];
    models[section].models.forEach((item) => {
        //Add model name to array
        arrModels.push(item.model_name);
    });

    return arrModels;
}

/** 
* @method: generateRoutes
* @description: Generate routes in base to models register
* @param: data {object} data configuration admin
*/
export function generateRoutes(data){
    let routes = [];

    let models = [];
    let columns = {};
    let columnsName = {};
    let fields = {};
    let id_unique = {};

    let sections = getSections(data.models);
    sections.forEach((section) => {
        //Loop for model register
        data.models[section].models.forEach((item) => {
            //Add model name to array
            models.push(item.model_name);
            //Object with columns for key model name
            columns[item.model_name] = item.columns;
            //Object with fields for key model name
            fields[item.model_name] = item.fields;
            //Id unique for model
            id_unique[item.model_name] = item.id_unique;
        });
    });

    models.forEach((model, i) => {
        //The data for the model
        let dataModel = {
            api: data.api,
            columns: columns[model],
            fields: fields[model],
            name_admin: data.name_admin,
            title_crud: model,
            model: model,
            pagination: data.pagination,
            id_unique: id_unique[model],
        };

        //Add route main crud
        routes.push(<Route key={i} path={'/' + model} model={dataModel} component={Crud} />);

        //Add route crud create
        routes.push(<Route key={i} path={'/' + model + '/add'} model={dataModel} component={FormCrud} />);

        //Add route crud edit
        routes.push(<Route key={i} path={'/' + model + '/edit' + '/:paramId'} model={dataModel} component={FormCrud} />);
    });

  return routes;
}

/**
* @method: capitalizeFirstLetter
* @description: capitalize the first letter string
* @param: string { string }: String to capitalize
*/
export function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
* @method: getColumns
* @description: Get columns crud to array
* @param stringColumns { string }: String columns to array
*/
export function getColumns(stringColumns) {
    let columns = stringColumns;
    columns = columns.split(',');
    columns = columns.map((s) => { return s.trim() });
    return columns;
}

/**
* @method: getColumnsName
* @description: Get columns crud to array
* @param columnsName { string }: Array fields
*/
export function getColumnsName(fields) {
    let arrColumns = [];
    for(let field in fields) {
        let i = Object.keys(fields).indexOf(field);
        arrColumns.push(<th key={i}>{fields[field].name}</th>);
    }
    return arrColumns;
}

/**
* @method: getField
* @description: Get component reference field
* @param: propsField {object} field props
* @param: isUpdate {boolean} if is form update
* @param: valuesRecord {object} data values
* @param: fieldNameApi {string} Name field in the api
*/
export function getField(propsField, isUpdate, valuesRecord, fieldNameApi) {
    let HtmlObject;
    let type, max_length, required, id, name, placeholder, value;

    type = propsField.type;
    max_length = propsField.max_length;
    required = propsField.required;
    id = 'id_' + fieldNameApi;
    name = fieldNameApi;
    placeholder = propsField.name;
    value = '';

    //Load value
    if (isUpdate) {
        value = valuesRecord[fieldNameApi];
    }

    if(value !== undefined || !isUpdate) {
        switch (type.toLowerCase()) {
            case 'textarea':
                HtmlObject = <div className='form-group'>
                        <label> {placeholder} </label>
                        <textarea name={name} id={id} className={'form-control'} rows={4} cols={50} required={required}
                            placeholder={placeholder} defaultValue={value}>
                        </textarea>
                    </div>;
                break;
            default:
                HtmlObject = <Input type={type} max_length={max_length}
                    required={required} id={id} name={name}
                    placeholder={placeholder} value={value} />
        }
    }

    return HtmlObject;
}
