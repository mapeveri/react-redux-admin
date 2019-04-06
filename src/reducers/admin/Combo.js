import * as actionsTypes from '../../constants/admin/ActionTypes';

const initialState = {
  data_api: [],
  pageNum: 0,
  isFetching: false,
  action: '',
}

export default function Combo(state = initialState, action) {
  switch (action.type){
      // To get data combo
      case actionsTypes.GET_DATA_COMBO:
        return Object.assign({}, state, {
            data_api: action.data,
            action: action.type
        });

      default:
        return state;
  }
}
