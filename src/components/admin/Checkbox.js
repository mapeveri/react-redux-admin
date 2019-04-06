import React, { Component, PropTypes } from 'react';

/**
* Checkbox component
*/
export default class Checkbox extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <div className="form-group">
        <label>{this.props.placeholder}</label>
        <input type="checkbox" name={this.props.name}
            id={this.props.id} placeholder={this.props.placeholder} style={{'marginLeft': '5px'}}
            required={this.props.required} defaultValue={this.props.value} />
      </div>
    );
  }
}

Checkbox.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  required: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired
}
