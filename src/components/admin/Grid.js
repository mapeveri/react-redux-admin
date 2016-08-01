import React, { Component, PropTypes } from 'react';

/*
  Main navbar component
*/
export default class Grid extends Component {
    constructor(props, context) {
      super(props, context);
    }

    /*
      @method: renderColumns
      @descrip: Render data columns
      @param: columns {array}: columns to render
    */
    renderColumns(columns) {
      let arrColumns = [];

      columns.forEach((column, i) => {
          arrColumns.push(<th key={i}>{column}</th>);
      });

      return arrColumns;
    }

    render() {
        let columns = this.props.data.columns;
        columns = columns.split(",");

        return (
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  {this.renderColumns(columns)}
                </tr>
              </thead>
            </table>
          </div>
        );
    }
}

Grid.propTypes = {
  data: PropTypes.object.isRequired,
}
