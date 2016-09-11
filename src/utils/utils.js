import React from 'react';
import { Route } from 'react-router';

import Input from '../components/admin/Input';
import Crud from '../containers/admin/Crud';
import FormCrud from '../containers/admin/FormCrud';

/*
  @method: getSections
  @descrip: Function that return the sections admin
  @params: data {object} data configuration admin
*/
export function getSections(data) {
  return Object.keys(data.models);
}

/*
  @method: getModels
  @descrip: Get models of one section
  @params: data {object} data configuration admin
           section {string} section to get models
*/
export function getModels(data, section) {
  let models = [];
  data.models[section].models.forEach((item) => {
    //Add model name to array
    models.push(item.model_name);
  });

  return models;
}

/*
  @method: parseDataAdmin
  @descrip: Function that return the data object order for model with:
        api: Api rest
        name_admin: Name administrator
        models: Object with all models register with the key model.
        columns: Object with columns of each model register.
        columns_name: Object with columns name of each model register.
        fields: Object with columns of earch model register.
        pagination: Number of pagination for page.
        id_unique: Field identifcation unique in model
  @params: data {object} data configuration admin
*/
export function parseDataAdmin(data){

  let models = [];
  let columns = {};
  let columnsName = {};
  let fields = {};
  let id_unique = {};

  let sections = getSections(data);
  sections.forEach((section) => {
    //Loop for model register
    data.models[section].models.forEach((item) => {
      //Add model name to array
      models.push(item.model_name);
      //Object with columns for key model name
      columns[item.model_name] = item.columns;
      //Object with columns name for key model name
      columnsName[item.model_name] = item.columns_name;
      //Object with fields for key model name
      fields[item.model_name] = item.fields;
      //Id unique for model
      id_unique[item.model_name] = item.id_unique;
    });
  });

  return {
    api: data.api,
    name_admin: data.name_admin,
    models: models,
    columns: columns,
    columnsName: columnsName,
    fields: fields,
    pagination: data.pagination,
    id_unique: id_unique,
  }
}

/*
  @method: generateRoutes
  @descrip: Generate routes in base to models register
  @params: data {object} data configuration admin
*/
export function generateRoutes(data){
  let routes = [];
  data.models.forEach((model, i) => {
      //The data for the model
      let dataModel = {
        api: data.api,
        columns: data.columns[model],
        columnsName: data.columnsName[model],
        fields: data.fields[model],
        name_admin: data.name_admin,
        title_crud: model,
        model: model,
        pagination: data.pagination,
        id_unique: data.id_unique[model],
      };

      //Add route main crud
      routes.push(<Route key={i} path={"/" + model} data={dataModel} component={Crud} />);

      //Add route crud create
      routes.push(<Route key={i} path={"/" + model + "/add"} data={dataModel} component={FormCrud} />);
  })

  return routes;
}

/*
  @method: capitalizeFirstLetter
  @descrip: capitalize the first letter string
  @param: string { string }: String to capitalize
*/
export function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

/*
  @method: getColumns
  @descrip: Get columns crud to array
  @param stringColumns { string }: String columns to array
*/
export function getColumns(stringColumns) {
  let columns = stringColumns;
  columns = columns.split(",");
  columns = columns.map((s) => { return s.trim() });
  return columns;
}

/*
 @method: getField
 @descrip: Get component reference field
 @param: field {object} field to get component
 @param: fieldName {string} Field name
*/
export function getField(field, fieldName) {
  let type, max_length, required, id, name, placeholder;

  type = field.type;
  max_length = field.max_length;
  required = field.required;
  id = "id_" + field.name;
  name = field.name;
  placeholder = fieldName;

  return <Input type={type} max_length={max_length}
            required={required} id={id} name={name}
            placeholder={placeholder} />
}
