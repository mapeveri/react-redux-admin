import React, { Component, PropTypes } from 'react';

/*
  Main navbar component
*/
export default class Navbar extends Component {
    constructor(props, context) {
      super(props, context);
    }

    render() {
        return (
            <div className="container">
                <div className="navbar navbar-default navbar-static">
                    <div className="navbar-header" align="centre"><a href={"/admin"} className="navbar-brand">{this.props.name_admin}</a></div>
                    <ul className="nav navbar-nav">
                        <li className="active"><a href="#/dashboard">Dashboard</a></li>
                    </ul>
                </div>
            </div>
        );
    }
}

Navbar.propTypes = {
  name_admin: PropTypes.string.isRequired
}
