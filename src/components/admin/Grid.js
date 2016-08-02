import React, { Component, PropTypes } from 'react';
import ReactPaginate from 'react-paginate';
import {connect} from 'react-redux';
import 'whatwg-fetch';

import { getDataApi } from '../../actions/admin';

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
          page, this.props.data.pagination, columns
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

      return arrColumns;
    }

    /*
      @method: renderRecords
      @descrip: Render data records
      @param: data {array}: data to render records
    */
    renderRecords(data) {
      let records = [];
      if(data !== undefined){
        data.map((item, key) => {
          let record = [];
          for (let key in item) {
            record.push(<td key={key}> { item[key] } </td>);
          }
          records.push(<tr> { record} </tr>);
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
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    {this.renderColumns()}
                  </tr>
                </thead>
                <tbody>
                  {this.renderRecords(this.props.data_api)}
                </tbody>
              </table>
            </div>
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
