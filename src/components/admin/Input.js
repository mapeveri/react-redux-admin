import React, { Component, PropTypes } from 'react';

/**
* Input component
*/
export default class Input extends Component {
    constructor(props, context) {
      super(props, context);
    }
    
    render() {
        let width = '';
        let max_length = parseInt(this.props.max_length);
        if(max_length >= 50 && max_length < 80){
          width = '50%'
        }else if (max_length >= 80 && max_length < 250) {
          width = '80%';
        }else{
          width = '100%'
        }

        return (
            <div className="form-group">
                <label>{this.props.placeholder}</label>
                <input type={this.props.type} name={this.props.name} className={"form-control"}
                id={this.props.id} placeholder={this.props.placeholder} style={{'width': width}}
                required={this.props.required} maxLength={this.props.max_length} defaultValue={this.props.value} />
            </div>
        );
    }
}

Input.propTypes = {
    type: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    required: PropTypes.bool.isRequired,
    max_length: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired
}
