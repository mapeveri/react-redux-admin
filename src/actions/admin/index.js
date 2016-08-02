import * as actionsTypes from '../../constants/admin/ActionTypes';

/*
  @method: getDataApi
  @descrip: Get data api for the cruds
  @param: api {string}: url api
  @param: page {integer}: Page to pagination
  @param: pagination {integer}: Configuration of items for pagination
  @param: columns {array}: columns cruds
*/
export function getDataApi(api, model, page, pagination, columns) {

  let limit = page * pagination;
  let start = limit - pagination;
  let url = api + model + "?_start=" + start +  "&_limit=" + limit;

  return dispatch => {
      fetch(url).then((response) => {
        let totalRecords = parseInt(response.headers.get('X-Total-Count'));
        return response.json().then((data) => {
          dispatch({
              type: actionsTypes.GET_DATA_API_CRUD, data: data,
              columns: columns, pagination: pagination, totalRecords: totalRecords
          });
        })
      }).catch((ex) => {
        console.log('Error to get records. ' + ex);
      })
    }
}
