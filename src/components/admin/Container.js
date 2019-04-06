import React, { Component } from 'react';

/**
 * Container bootstrap component
 */
export default class Container extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return <div className='container'>{this.props.children}</div>;
  }
}
