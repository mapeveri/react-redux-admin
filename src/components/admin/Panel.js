import React, { Component, PropTypes } from 'react';

/**
* Panel div component
*/
export default class Panel extends Component {
  constructor(props, context) {
      super(props, context);
  }

  render() {
    return (
      <div className='card' style={{width: this.props.width_panel}}>
        <div className='card-body'>
          <h5 class="card-title">{this.props.title}</h5>
            {this.props.children}
        </div>
      </div>
    );
  }
}

Panel.propTypes = {
  title: PropTypes.string.isRequired,
  width_panel: PropTypes.string.isRequired,
}
