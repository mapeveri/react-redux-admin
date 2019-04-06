import * as actionsTypes from '../../constants/admin/ActionTypes';

const initialState = {
  data_api: [],
  pageNum: 0,
  isFetching: false,
  action: ''
};

export default function Crud(state = initialState, action) {
  switch (action.type) {

    // To get all data api model
    case actionsTypes.GET_DATA_API_CRUD:
      const data_api = [];

      // Filter data to columns register
      action.data.forEach(item => {
        const record = {};
        for (let key in item) {
          //Column required and not include id_unique
          if (action.columns.indexOf(key) > -1 || key == action.id_unique) {
            if (key === action.id_unique) {
              record['pk'] = item[key];
            } else {
              record[key] = item[key];
            }
          }
        }

        data_api.push(record);
      });

      //If is search filter data
      if (action.isSearch) {
        data_api.forEach((record, i) => {
          let exists = false;
          for (let key in record) {
            //If contains the value to filter
            if (typeof record[key] === 'string') {
              if (record[key].toLocaleLowerCase().indexOf(action.textSearch.toLocaleLowerCase()) > -1) {
                exists = true;
              }
            }
          }

          //Remove record not used
          if (!exists) {
            delete data_api[i];
          }
        });
      }

      return Object.assign({}, state, {
        data_api: data_api,
        pageNum: Math.ceil(action.totalRecords / action.pagination),
        isFetching: true,
        action: action.type
      });

    // Set property isFetching
    case actionsTypes.SET_FETCHING:
      return Object.assign({}, state, {
        isFetching: action.fetching,
        action: action.type
      });

    // Get one record of model
    case actionsTypes.GET_DATA_RECORD:
      return Object.assign({}, state, {
        isFetching: true,
        data_api: action.data,
        action: action.type
      });

    // To delete record
    case actionsTypes.DELETE_RECORD:
      return Object.assign({}, state, {
        isFetching: true,
        data_api: action.data,
        action: action.type
      });

    default:
      return state;
  }
}
