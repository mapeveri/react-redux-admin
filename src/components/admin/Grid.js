import React, { Component, PropTypes } from 'react';
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

    componentDidMount() {
        let columns = this.getColumns();
        //Obtengo la primera página
        this.props.getDataApi(this.props.data.api, this.props.data.model, columns);
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
      @method: renderColumns
      @descrip: Render data columns
      @param: columns {array}: columns to render
    */
    renderColumns(columns) {
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

    render() {
        let columns = this.getColumns();

        return (
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  {this.renderColumns(columns)}
                </tr>
              </thead>
              <tbody>
                {this.renderRecords(this.props.data_api)}
              </tbody>
            </table>
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
    }
}

//Conect component to redux
export default connect(mapStateToProps, {getDataApi})(Grid);
