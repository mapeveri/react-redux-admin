import React, { Component, PropTypes } from 'react';

/*
  Center div component
*/
export default class Center extends Component {
    constructor(props, context) {
      super(props, context);
    }

    render() {
        return (
            <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                {this.props.children}
            </div>
        );
    }
}
