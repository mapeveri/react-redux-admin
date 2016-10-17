import React, { Component, PropTypes } from 'react';
import ReactPaginate from 'react-paginate';
import {connect} from 'react-redux';
import 'whatwg-fetch';
import Loading from 'react-loading-animation';

import { getDataApi, setFetching } from '../../actions/admin';
import { getColumns } from '../../utils/utils';
import ButtonLink from '../../components/admin/ButtonLink';
import Center from '../../components/admin/Center';
import Modal from '../../components/admin/Modal';

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
      this.getRecords(1);
    }

    /**
    * @method: getRecords
    * @description: Get records to page
    * @param {integer}: Page to get data
    */
    getRecords(page) {
      let columns = getColumns(this.props.data.columns);
      //Obtengo la primera página
      this.props.getDataApi(
          this.props.data.api, this.props.data.model,
          page, this.props.data.pagination, columns,
          this.props.data.id_unique
      );
    }

    /**
    * @method: getColumnsName
    * @description: Get columnsName crud
    */
    getColumnsName() {
      let columnsName = this.props.data.columnsName;
      columnsName = columnsName.split(",");
      columnsName = columnsName.map((s) => { return s.trim() });
      return columnsName
    }

    /**
    * @method: renderColumns
    * @description: Render data columns
    */
    renderColumns() {
      let columns = this.getColumnsName();
      let arrColumns = [];

      columns.map((column, i) => {
          arrColumns.push(<th key={i}>{column}</th>);
      });

      //Actions column
      arrColumns.push(<th key={-1}>{"Actions"}</th>);

      return arrColumns;
    }

    /**
    * @method: renderRecords
    * @description: Render data records
    * @param: data {array}: data to render records
    */
    renderRecords(data) {
      let records = [];

      //If has data
      if(typeof(data) !== "undefined"){
        data.map((item, i) => {
          let record = [];

          //Get id_unique and remove
          let id_unique = item[this.props.data.id_unique];
          delete item[this.props.data.id_unique];

          //Load record
          for (let key in item) {
            record.push(<td key={key}> { item[key] } </td>);
          }

          //Buttons action
          let urlEdit = "#/" + this.props.data.model.toLowerCase() + "/" + "edit/" + id_unique;
          let urlRemove = "#/" + this.props.data.model.toLowerCase() + "/" + "remove/" + id_unique;
          let buttonEdit = <ButtonLink link={urlEdit} text={"Edit"} classButton={"default"} />;
          let buttonRemove = <button type="button" className="btn btn-danger" data-toggle="modal" data-target={"#modal_" + id_unique}>{"Delete"}</button>;
          let modal = <Modal id={id_unique} title={"Delete"} content={"Do you want to delete the record?"} submit={this.submitDelete.bind(this, id_unique, urlRemove)} />;

          //Add record to array records
          records.push(<tr> { record} <td>{buttonEdit} {buttonRemove} {modal}</td> </tr>);
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
      console.log("Delete " + id);
      console.log(urlRemove);
    }

    /**
    * @method: handlePageClick
    * @description: Handle click to pagination
    * @param: pagination {integer} Records for page
    * @param: dataclick {object} data bind in click pagination
    */
    handlePageClick(pagination, dataclick) {
      let columns = getColumns(this.props.data.columns);
      let page = dataclick.selected + 1;
      //Update fetching to show Loading
      this.props.setFetching(false);

      //Obtengo la primera página
      this.props.getDataApi(
          this.props.data.api, this.props.data.model,
          page, pagination, columns
      );
    }

    render() {
        const { isFetching } = this.props;
        return (
          <div className="table-responsive" style={{overflowX: "initial"}}>
            {!isFetching && <Loading />}
            <table className="table table-bordered table-striped">
              <thead>
                <tr>
                  {isFetching && this.renderColumns()}
                </tr>
              </thead>
              <tbody>
                {isFetching && this.renderRecords(this.props.data_api)}
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
                 clickCallback={this.handlePageClick.bind(this, this.props.data.pagination)}
                 containerClassName={"pagination"}
                 subContainerClassName={"pages pagination"}
                 activeClassName={"active"} />
               </center>
          </div>
        );
    }
}

Grid.propTypes = {
  data: PropTypes.object.isRequired,
}

function mapStateToProps(state) {
    return {
        data_api: state.Crud.data_api,
        pageNum: state.Crud.pageNum,
        isFetching: state.Crud.isFetching,
    }
}

//Conect component to redux
export default connect(mapStateToProps, {getDataApi, setFetching})(Grid);
