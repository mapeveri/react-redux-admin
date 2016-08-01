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
