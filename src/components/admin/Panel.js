import React, { Component, PropTypes } from 'react';

/*
  Panel div component
*/
export default class Panel extends Component {
    constructor(props, context) {
      super(props, context);
    }

    render() {
        return (
            <div className="panel panel-default" style={{width: this.props.width_panel}}>
              <div className="panel-heading">
                <h3 className="panel-title"> {this.props.title}</h3>
              </div>
              <div className="panel-body">
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
