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
            <div className={this.props.classCenter}>
                {this.props.children}
            </div>
        );
    }
}

Center.propTypes = {
  classCenter: PropTypes.string.isRequired
}
