import React, { Component } from 'react';

/*
  Search input crud component
*/
export default class Search extends Component {
    constructor(props, context) {
      super(props, context);
    }

    render() {
        return (
            <div>
              <input type="search" className="form-control" placeholder="Search" />
            </div>
        );
    }
}
