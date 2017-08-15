import React, { Component } from 'react';
import {connect} from 'react-redux';

import { getDataApi, setFetching } from '../../actions/admin';
import { getColumns } from '../../utils/utils';

/**
* Search input crud component
*/
class Search extends Component {
    constructor(props, context) {
      super(props, context);
    }

    /**
    * @method: onSearch
    * @description: To event onSearch in click go
    */
    onSearch() {
      let textSearch = document.getElementById('input_search_component').value;
      let columns = getColumns(this.props.data.columns);

      //Set fetching in false to show loading
      this.props.dispatch(setFetching(false));

      //If empty return to page 1
      if (textSearch === ''){
        //Obtengo la primera página
        this.props.dispatch(getDataApi(
            this.props.data.api, this.props.data.model,
            1, this.props.data.pagination, columns,
            this.props.data.id_unique
        ))
      }else{
        //Obtengo la primera página
        this.props.dispatch(getDataApi(
            this.props.data.api, this.props.data.model,
            null, this.props.data.pagination, columns,
            this.props.data.id_unique, textSearch
        ))
      }
    }

    render() {
        return (
            <div className="form-inline">
                <input type="search" id="input_search_component"
                  className="form-control" placeholder="Search" />
                <input type="button" className="btn btn-default" onClick={this.onSearch.bind(this)} value="Go" />
            </div>

        )
    }
}

export default connect()(Search);
