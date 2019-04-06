import React from 'react';
import { Route } from 'react-router';

import Input from '../components/admin/Input';
import Checkbox from '../components/admin/Checkbox';
import ComboBox from '../components/admin/ComboBox';
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
  const arrModels = [];
  models[section].models.forEach((item) => {
    // Add model name to array
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
  const routes = [];
  const models = [];
  const columns = {};
  const fields = {};
  const id_unique = {};

  const sections = getSections(data.models);
  sections.forEach((section) => {
    // Loop for model register
    data.models[section].models.forEach((item) => {
      // Add model name to array
      models.push(item.model_name);
      // Object with columns for key model name
      columns[item.model_name] = item.columns;
      // Object with fields for key model name
      fields[item.model_name] = item.fields;
      // Id unique for model
      id_unique[item.model_name] = item.id_unique;
    });
  });

  models.forEach((model, i) => {
    // The data for the model
    const dataModel = {
      api: data.api,
      columns: columns[model],
      fields: fields[model],
      name_admin: data.name_admin,
      title_crud: model,
      model: model,
      pagination: data.pagination,
      id_unique: id_unique[model],
    };

    // Add route main crud
    routes.push(<Route key={i} path={'/' + model} model={dataModel} component={Crud} />);

    // Add route crud create
    routes.push(<Route key={i} path={'/' + model + '/add'} model={dataModel} component={FormCrud} />);

    // Add route crud edit
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
* @method: getColumnsName
* @description: Get columns crud to array
* @param columnsName { string }: Array fields
*/
export function getColumnsName(fields, columns) {
  const arrColumns = [];

  for(let field in fields) {
      let i = Object.keys(fields).indexOf(field);
      if (columns.indexOf(field) > -1) {
        arrColumns.push(<th key={i}>{fields[field].name}</th>);
      }
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
  let type, max_length, required, id, name, placeholder, value, api;

  type = propsField.type;
  max_length = propsField.max_length;
  required = propsField.required;
  id = 'id_' + fieldNameApi;
  name = fieldNameApi;
  placeholder = propsField.name;
  value = '';
  api = propsField.api;

  // Load value
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

      case 'combobox':
        HtmlObject = <ComboBox name={name} id={id} required={required}
                    placeholder={placeholder} value={value}
                    relation={propsField.relation} api={api} pk={propsField.pk} />
        break;

      case 'checkbox':
        HtmlObject = <Checkbox required={required} id={id} name={name}
            placeholder={placeholder} value={value} />
        break;

      default:
        HtmlObject = <Input type={type} max_length={max_length}
            required={required} id={id} name={name}
            placeholder={placeholder} value={value} />
        break;
    }
  }

  return HtmlObject;
}
