import * as actionsTypes from '../../constants/admin/ActionTypes';

export default function Crud(state = {}, action) {
    switch (action.type){
        case actionsTypes.GET_DATA_API_CRUD:
            let data_api = [];
            //Filter data to columns register
            action.data.forEach((item) => {
              let record = {};
              for (let key in item) {
                if(action.columns.indexOf(key) > -1) {
                  record[key] = item[key];
                }
              }
              data_api.push(record);
            });

            return Object.assign({}, state, {
                data_api: data_api,
            });
            return state;
        default:
            return state;
    }
}
