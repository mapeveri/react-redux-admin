import React, { Component, PropTypes } from 'react';

import Center from '../../components/admin/Center';
import Container from '../../components/admin/Container';
import Navbar from '../../components/admin/Navbar';
import Panel from '../../components/admin/Panel';

import { capitalizeFirstLetter } from '../../utils/utils';


/*
  Form Create/Update crud
*/
export default class FormCrud extends Component {
    constructor(props, context) {
      super(props, context);
    }

    render() {
      let data = this.props.route.data;
      let title_form = "Create " + capitalizeFirstLetter(data.title_crud);

      return (
          <div>
            <Navbar name_admin={ data.name_admin } />
            <Container>
                <Center>
                  <Panel title={title_form} width_panel="90%" style={{marginBottom: "1em"}}>
                      <form>

                      </form>
                  </Panel>
                </Center>
            </Container>
          </div>
      );
    }
}

FormCrud.propTypes = {
  data: PropTypes.object.isRequired,
}
