import React from 'react';
import { Route } from 'react-router';

import Crud from '../containers/admin/Crud';

/*
  @method: parseDataAdmin
  @descrip: Function that return one object with:
        api: Api rest
        name_admin: Name administrator
        models: Object with all models register
        columns: Object with columns of each model register
        fields: Object with columns of earch model register
  @params: data {object} data configuration admin
*/
export function parseDataAdmin(data){

  let models = [];
  let columns = {};
  let fields = {};

  data.models.data.forEach((item) => {
    models.push(item.model_name);
    columns[item.model_name] = item.columns;
    fields[item.model_name] = item.fields;
  });

  return {
    api: data.api,
    name_admin: data.name_admin,
    models: models,
    columns: columns,
    fields: fields
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
        fields: data.fields[model],
        name_admin: data.name_admin,
        title_crud: model,
        model: model,
      };

      //Add route
      routes.push(<Route key={i} path={"/" + model} data={dataModel} component={Crud} />);
  })

  return routes;
}

/*
  @method: capitalizeFirstLetter
  @descrip: capitalize the first letter string
  @param: { string }: String to capitalize
*/
export function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
