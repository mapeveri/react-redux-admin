import * as actionsTypes from '../../constants/admin/ActionTypes';

/**
* @method: getDataApi
* @description: Get data api for the cruds
* @param: api {string}: url api
* @param: page {integer}: Page to pagination
* @param: pagination {integer}: Configuration of items for pagination
* @param: columns {array}: columns cruds
* @param: id_unique {string}: Field identifcation unique in model
* @param: textSearch {string}: Text to search in crud
*/
export function getDataApi(api, model, page, pagination, columns, id_unique, textSearch='') {
    let url;
    let isSearch = false;

    //If its is null, then is searching and get all data for to search
    if (page === null) {
        url = api + model;
        isSearch = true;
    } else {
        let limit = page * pagination;
        let start = limit - pagination;
        url = api + model + '?_start=' + start +  '&_limit=' + limit;
    }

    return dispatch => {
        fetch(url).then((response) => {
            let totalRecords = parseInt(response.headers.get('X-Total-Count'));
            return response.json().then((data) => {
                dispatch({
                    type: actionsTypes.GET_DATA_API_CRUD, data: data,
                    columns: columns, pagination: pagination, totalRecords: totalRecords,
                    id_unique: id_unique, isSearch: isSearch, textSearch: textSearch
                });
            })
        }).catch((ex) => {
            console.log('Error to get records. ' + ex);
        });
    }
}

/** 
* @method: setFetching
* @description: Update isFetching property
* @param: fetching {object} Value to set
*/
export function setFetching(fetching) {
    return dispatch => {
        dispatch({
            type: actionsTypes.SET_FETCHING, fetching: fetching
        });
    }
}

/**
* @method: getDataRecord
* @description: Get data record id
* @param: api {string}: url api
* @param: model {string}: Model
* @param: id {integer}: Id to BiquadFilterNode
*/
export function getDataRecord(api, model, id) {
    //Url to get data
    let url = api + model + '/' + id;

    return dispatch => {
        fetch(url).then((response) => {
            return response.json().then((data) => {
            dispatch({
                type: actionsTypes.GET_DATA_RECORD, data: data,
            });
            })
        }).catch((ex) => {
            console.log('Error to get records. ' + ex);
        });
    }
}


/**
* @method: insertRecord
* @description: Insert new record
* @param: api {string}: url api
* @param: model {string}: Model
* @param: params {object}: Data form to insert
*/
export function insertRecord(api, model, params) {

    //Url to get data
    let url = api + model;
    return dispatch => {
        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: params
        }).then((response) => {
            return response.json().then((data) => {
                dispatch({
                    type: actionsTypes.INSERT_RECORD, data: data,
                });
            })
        }).catch((ex) => {
            console.log('Error to insert record. ' + ex);
        });
    }
}

/**
* @method: updateRecord
* @description: Update record
* @param: api {string}: url api
* @param: id {string}: id to update
* @param: model {string}: Model
* @param: params {object}: Data form to insert
*/
export function updateRecord(api, id, model, params) {

    //Url to get data
    let url = api + model + '/' + id;
    return dispatch => {
        fetch(url, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: params
        }).then((response) => {
            return dispatch({
                type: actionsTypes.UPDATE_RECORD,
            });
        }).catch((ex) => {
            console.log('Error to update record. ' + ex);
        });
    }
}

/**
* @method: deleteRecord
* @description: Delete record
* @param: url {string}: url api
*/
export function deleteRecord(url) {
    return dispatch => {
        fetch(url, {
            method: 'DELETE'
        }).then((response) => {
            return dispatch({
                type: actionsTypes.DELETE_RECORD
            });
        }).catch((ex) => {
            console.log('Error to delete record. ' + ex);
        });
    }
}