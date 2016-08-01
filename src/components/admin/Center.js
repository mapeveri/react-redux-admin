import React, { Component } from 'react';

/*
  Center div component
*/
export default class Center extends Component {
    constructor(props, context) {
      super(props, context);
    }

    render() {
        return (
            <div className="col-md-5 col-md-offset-3">
                {this.props.children}
            </div>
        );
    }
}
