import React, { Component } from 'react';

import Container from '../../components/admin/Container';
import Navbar from '../../components/admin/Navbar';
import Panel from '../../components/admin/Panel';

import { capitalizeFirstLetter } from '../../utils/utils';

/*
  Crud container
*/
export default class Crud extends Component {
    constructor(props, context) {
      super(props, context);
    }

    render() {
        let data = this.props.route.data;
        let title_crud = capitalizeFirstLetter(data.title_crud);
        let columns = data.columns;

        return (
            <div>
              <Navbar name_admin={ data.name_admin } />
              <Container>
                  <Panel title={title_crud}>
                  </Panel>
              </Container>
            </div>
        );
    }
}
