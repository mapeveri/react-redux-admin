import React, { Component, PropTypes } from 'react';
import ReactPaginate from 'react-paginate';
import {connect} from 'react-redux';
import 'whatwg-fetch';
import Loading from 'react-loading-animation';

import { getDataGrid, setFetching, deleteRecord } from '../../actions/admin';
import { getColumnsName } from '../../utils/utils';
import ButtonLink from '../../components/admin/ButtonLink';
import Center from '../../components/admin/Center';
import Modal from '../../components/admin/Modal';
import * as actionsTypes from '../../constants/admin/ActionTypes';

/**
* Grid navbar component
*/
class Grid extends Component {
    constructor(props, context) {
        super(props, context);
    }

    /**
    * @method: componentDidMount
    * @description: To init component
    */
    componentDidMount() {
        //Get the first page
        this.getRecords(1);
    }

    /**
    * @method: getRecords
    * @description: Get records data to Grid
    * @param page {number}: Number page
    */
    getRecords(page) {
        let url = this.props.model.api + this.props.model.model;
        this.props.getDataGrid(
            url, page, this.props.model.pagination, this.props.model.columns,
            this.props.model.id_unique
        );
    }

    /**
    * @method: renderColumns
    * @description: Render data columns
    */
    renderColumns() {
        let arrColumns = getColumnsName(this.props.model.fields, this.props.model.columns);
        //Actions column
        arrColumns.push(<th key={-1}>{"Actions"}</th>);

        return arrColumns;
    }

    /**
    * @method: renderRecords
    * @description: Render data records in grid
    * @param: data {array}: data to render records
    */
    renderRecords(data) {
        let records = [];

        //If has data
        if(typeof(data) !== 'undefined'){
            data.map((item, i) => {
                let record = [];

                //Get id_unique and remove
                let id_unique = item['pk'];

                //For not show in the grid
                delete item['pk'];

                //Load record
                for (let key in item) {
                    if(typeof(item[key]) == 'boolean') {
                        record.push(<td key={key}>{ item[key] == true ? 'Yes' : 'No' }</td>);
                    } else {
                        record.push(<td key={key}>{ item[key] }</td>);
                    }
                }

                //Buttons action
                let urlEdit = '#/' + this.props.model.model.toLowerCase() + '/' + 'edit/' + id_unique;
                let urlRemove = this.props.model.api + this.props.model.model.toLowerCase() + '/' + id_unique;

                let buttonEdit = <ButtonLink link={urlEdit} text={"Edit"} classButton={"default"} />;
                let buttonRemove = <button type="button" className="btn btn-danger" data-toggle="modal" data-target={'#modal_' + id_unique}>{"Delete"}</button>;
                let modal = <Modal id={id_unique} title={"Delete"} content={"Do you want to delete the record?"} submit={this.submitDelete.bind(this, id_unique, urlRemove)} />;

                //Add record to array records
                records.push(<tr key={i}>{record}<td>{buttonEdit} {buttonRemove} {modal}</td></tr>);
            });
        }

      return records;
    }

    /**
    * @method: submitDelete
    * @description: Submit remove item
    * @param: id {int} id to delete
    * @param: urlRemove {string} ulr api to remove
    */
    submitDelete(id, urlRemove) {
        $('#modal_' + id).modal('hide');
        this.props.deleteRecord(urlRemove);
        this.getRecords(1);
    }

    /**
    * @method: handlePageClick
    * @description: Handle click to pagination
    * @param: pagination {integer} Records for page
    * @param: dataclick {object} data bind in click pagination
    */
    handlePageClick(pagination, dataclick) {
        let page = dataclick.selected + 1;
        //Update fetching to show Loading
        this.props.setFetching(false);

        //Get page
        let url = this.props.model.api + this.props.model.model;
        this.props.getDataGrid(
            url, page, pagination, this.props.model.columns, this.props.model.id_unique
        );
    }

    render() {
        const { isFetching, action } = this.props;
        return (
          <div className="table-responsive" style={{overflowX: 'initial'}}>
            {!isFetching && <Loading />}
            <table className="table table-bordered table-striped">
              <thead>
                <tr>
                  {isFetching && this.renderColumns()}
                </tr>
              </thead>
              <tbody>
                {isFetching && action == actionsTypes.GET_DATA_API_CRUD && this.renderRecords(this.props.data_api)}
              </tbody>
            </table>
            <center>
              <ReactPaginate previousLabel={"<"}
                 nextLabel={">"}
                 breakLabel={<a href="">...</a>}
                 breakClassName={"break-me"}
                 pageNum={this.props.pageNum}
                 marginPagesDisplayed={2}
                 pageRangeDisplayed={5}
                 clickCallback={this.handlePageClick.bind(this, this.props.model.pagination)}
                 containerClassName={"pagination"}
                 subContainerClassName={"pages pagination"}
                 activeClassName={"active"} />
               </center>
          </div>
        );
    }
}

Grid.propTypes = {
    model: PropTypes.object.isRequired,
}

function mapStateToProps(state) {
    return {
        data_api: state.Crud.data_api,
        pageNum: state.Crud.pageNum,
        isFetching: state.Crud.isFetching,
        action: state.Crud.action,
    }
}

//Conect component to redux
export default connect(mapStateToProps, {getDataGrid, setFetching, deleteRecord})(Grid);
