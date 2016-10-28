import React from 'react';
import { Route } from 'react-router';

import Input from '../components/admin/Input';
import Crud from '../containers/admin/Crud';
import FormCrud from '../containers/admin/FormCrud';

/**
* @method: getSections
* @description: Function that return the sections admin
* @param: data {object} data configuration admin
*/
export function getSections(data) {
  return Object.keys(data.models);
}

/**
* @method: getModels
* @description: Get models of one section
* @param: data {object} data configuration admin
* @param section {string} section to get models
*/
export function getModels(data, section) {
  let models = [];
  data.models[section].models.forEach((item) => {
    //Add model name to array
    models.push(item.model_name);
  });

  return models;
}

/**
* @method: parseDataAdmin
* @description: Function that return the data object order for model with:
* @param api {string}: Api rest
* @param name_admin {string}: Name administrator
* @param models {object}: Object with all models register with the key model.
* @param columns {object} Object with columns of each model register.
* @param columns_name {object}: Object with columns name of each model register.
* @param fields {object}: Object with columns of earch model register.
* @param pagination {number}: Number of pagination for page.
* @param id_unique{number}: Field identifcation unique in model
* @params: data {object} data configuration admin
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

/** 
* @method: generateRoutes
* @description: Generate routes in base to models register
* @param: data {object} data configuration admin
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

      let dataModelCreate = dataModel;
      dataModelCreate['action'] = "c";

      let dataModelUpdate = dataModel;
      dataModelUpdate['action'] = "e";

      //Add route main crud
      routes.push(<Route key={i} path={"/" + model} data={dataModel} component={Crud} />);

      //Add route crud create
      routes.push(<Route key={i} path={"/" + model + "/add"} data={dataModelCreate} component={FormCrud} />);

      //Add route crud edit
      routes.push(<Route key={i} path={"/" + model + "/edit" + "/:paramId"} data={dataModelUpdate} component={FormCrud} />);
  })

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
  columns = columns.split(",");
  columns = columns.map((s) => { return s.trim() });
  return columns;
}

/**
* @method: getField
* @description: Get component reference field
* @param: field {object} field to get component
* @param: isUpdate {boolean} if is form update
* @param: dataRecord {object} data field
* @param: fieldNameApi {string} Name field in the api
*/
export function getField(field, isUpdate, dataRecord, fieldNameApi) {
  let HtmlObject;
  let type, max_length, required, id, name, placeholder, value;

  type = field.type;
  max_length = field.max_length;
  required = field.required;
  id = "id_" + field.name;
  name = field.name;
  placeholder = field.name;
  value = "";

  //Load value
  if (isUpdate) {
    value = dataRecord[fieldNameApi];
  }

  switch (type.toLowerCase()) {
    case "textarea":
      HtmlObject = <div className="form-group">
        <label> {placeholder} </label>
        <textarea name={name} id={id} className={"form-control"} rows={4} cols={50} required={required}
          placeholder={placeholder} value={value}>
        </textarea>
      </div>;
      break;
    default:
      HtmlObject = <Input type={type} max_length={max_length}
                required={required} id={id} name={name}
                placeholder={placeholder} value={value} />
  }

  return HtmlObject;
}
