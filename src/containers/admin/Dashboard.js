import React, { Component, PropTypes } from 'react';

import Container from '../../components/admin/Container';
import Navbar from '../../components/admin/Navbar';
import PanelSections from '../../components/admin/PanelSections';

import { capitalizeFirstLetter } from '../../utils/utils';

/**
* Crud container
*/
export default class Dashboard extends Component {
    constructor(props, context) {
      super(props, context);
    }

    render() {
        let data = this.props.route.data;
        return (
            <div>
              <Navbar name_admin={ data.name_admin } />
              <Container>
                <PanelSections data={data} />
              </Container>
            </div>
        );
    }
}

Dashboard.propTypes = {
  data: PropTypes.object.isRequired,
}
