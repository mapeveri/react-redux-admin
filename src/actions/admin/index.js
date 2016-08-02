import * as actionsTypes from '../../constants/admin/ActionTypes';

/*
  @method: getDataApi
  @descrip: Get data api for the cruds
  @param: api {string}: url api
  @param: columns {array}: columns cruds
*/
export function getDataApi(api, model, columns) {
  return dispatch => {
      fetch(api + model).then((response) => {
        return response.json().then((data) => {
          dispatch({type: actionsTypes.GET_DATA_API_CRUD, data: data, columns: columns});
        })
      }).catch((ex) => {
        console.log('Error to get records. ' + ex);
      })
    }
}
