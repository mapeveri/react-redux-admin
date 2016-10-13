import React, { Component, PropTypes } from 'react';

/**
* ButtonLink div component
*/
export default class ButtonLink extends Component {
    constructor(props, context) {
      super(props, context);
    }

    render() {
        return (
            <a href={this.props.link} className={"btn btn-" + this.props.classButton }> {this.props.text} </a>
        );
    }
}

ButtonLink.propTypes = {
  link: PropTypes.string.isRequired,
  classButton: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
}
