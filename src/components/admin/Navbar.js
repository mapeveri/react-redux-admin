import React, { Component } from 'react';

export default class Navbar extends Component {
    constructor(props, context) {
      super(props, context);
    }

    render() {
        return (
            <div className="container">
                <div className="navbar navbar-default navbar-static">
                    <div className="navbar-header" align="centre"><a className="navbar-brand">React redux admin</a></div>
                    <ul className="nav navbar-nav">
                        <li className="active"><a href="/admin">Index</a></li>
                    </ul>
                </div>
            </div>
        );
    }
}
