import React, { Component, PropTypes } from 'react';

/**
* Main navbar component
*/
export default class Navbar extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <nav className='navbar navbar-dark bg-dark'>
        <div className='navbar-header'><a href={'/admin'} className='navbar-brand'>{this.props.name_admin}</a></div>
        <ul className='nav navbar-nav'>
            <li className='active'><a href='#/dashboard'>Dashboard</a></li>
        </ul>
      </nav>
    );
}
}

Navbar.propTypes = {
  name_admin: PropTypes.string.isRequired
}
