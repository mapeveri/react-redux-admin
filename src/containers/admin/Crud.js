import React, { Component } from 'react';

import Container from '../../components/admin/Container';
import Navbar from '../../components/admin/Navbar';

/*
  Crud container
*/
export default class Crud extends Component {
    constructor(props, context) {
      super(props, context);
    }

    render() {
        let data = this.props.route.data;
        return (
            <div>
              <Navbar name_admin={ data.name_admin } />
              <Container>
                  {this.props.children}
              </Container>
            </div>
        );
    }
}
