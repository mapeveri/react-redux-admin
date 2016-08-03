import React, { Component, PropTypes } from 'react';
import ReactPaginate from 'react-paginate';
import {connect} from 'react-redux';
import 'whatwg-fetch';

import { getDataApi } from '../../actions/admin';
import ButtonLink from '../../components/admin/ButtonLink';
import Center from '../../components/admin/Center';

/*
  Main navbar component
*/
class Grid extends Component {
    constructor(props, context) {
      super(props, context);
    }

    /*
      @method: componentDidMount
      @descrip: To init component
    */
    componentDidMount() {
      this.getRecords(1);
    }

    getRecords(page) {
      let columns = this.getColumns();
      //Obtengo la primera página
      this.props.getDataApi(
          this.props.data.api, this.props.data.model,
          page, this.props.data.pagination, columns,
          this.props.data.id_unique
      );
    }

    /*
      @method: getColumns
      @descrip: Get columns crud
    */
    getColumns() {
      let columns = this.props.data.columns;
      columns = columns.split(",");
      columns = columns.map((s) => { return s.trim() });
      return columns
    }

    /*
      @method: getColumnsName
      @descrip: Get columnsName crud
    */
    getColumnsName() {
      let columnsName = this.props.data.columnsName;
      columnsName = columnsName.split(",");
      columnsName = columnsName.map((s) => { return s.trim() });
      return columnsName
    }

    /*
      @method: renderColumns
      @descrip: Render data columns
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

    /*
      @method: renderRecords
      @descrip: Render data records
      @param: data {array}: data to render records
    */
    renderRecords(data) {
      let records = [];

      //If has data
      if(data !== undefined){
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
          let urlEdit = "#/" + this.props.data.model + "/" + "edit/" + id_unique;
          let urlRemove = "#/" + this.props.data.model + "/" + "remove/" + id_unique;
          let buttonEdit = <ButtonLink link={urlEdit} text={"Edit"} classButton={"default"} />;
          let buttonRemove = <ButtonLink link={urlRemove} text={"Remove"} classButton={"danger"} />;

          //Add record to array records
          records.push(<tr> { record} <td>{buttonEdit} {buttonRemove}</td> </tr>);
        });
      }

      return records;
    }

    /*
      @method: handlePageClick
      @descrip: Handle click to pagination
      @param: pagination {integer} Records for page
      @param: dataclick {object} data bind in click pagination
    */
    handlePageClick(pagination, dataclick) {
      let columns = this.getColumns();
      let page = dataclick.selected + 1;

      //Obtengo la primera página
      this.props.getDataApi(
          this.props.data.api, this.props.data.model,
          page, pagination, columns
      );
    }

    render() {
        return (
          <div>
            <table className="table table-bordered table-responsive">
              <thead>
                <tr>
                  {this.renderColumns()}
                </tr>
              </thead>
              <tbody>
                {this.renderRecords(this.props.data_api)}
              </tbody>
            </table>
            <center classCenter={"col-md-8 col-md-offset-5"}>
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
    }
}

//Conect component to redux
export default connect(mapStateToProps, {getDataApi})(Grid);
