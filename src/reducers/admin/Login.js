import * as actionsTypes from '../../constants/admin/ActionTypes';

const initialState = {
    username: '',
    password: 0
}

export default function Login(state = initialState, action) {
    switch (action.type){
        case actionsTypes.LOGIN:
            return state;
        default:
            return state;
    }

}