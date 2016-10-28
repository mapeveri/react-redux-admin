import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import { hashHistory } from 'react-router';
import { reduxForm } from 'redux-form';

import Center from '../../components/admin/Center';
import Container from '../../components/admin/Container';
import Navbar from '../../components/admin/Navbar';
import Panel from '../../components/admin/Panel';

export const fields = ['username', 'password'];

const validate = values => {
    const errors = {}
    let text_error = "Required";
    if (!values.username) {
        errors.username = text_error;
    }
    if (!values.password) {
        errors.password = text_error;
    }
    return errors
}

/**
* Login page container
*/
class Login extends Component {
    constructor(props, context) {
        super(props, context);
    }

    /**
    * method: handleSubmit
    * descrip: Submit form
    */
    handleSubmit(data, dispatch) {
        //hashHistory.push('/admin/index');
    }

    render() {
        let data = this.props.route.data;
        const { fields: { username, password }, resetForm, handleSubmit, submitting  } = this.props;
        return (
          <div>
            <Navbar name_admin={ data.name_admin } />
            <Container>
              <Center>
                  <Panel title={"Login"} width_panel="50%">
                      <form onSubmit={handleSubmit(this.handleSubmit)}>
                          <div className="form-group">
                              <input type="text" className="form-control" placeholder="Username" {...username} />
                              {username.touched && username.error && <div style={{"color": "red"}}>{username.error}</div>}
                          </div>
                          <div className="form-group">
                              <input type="password" className="form-control" placeholder="Password" {...password} />
                              {password.touched && password.error && <div style={{"color": "red"}}>{password.error}</div>}
                          </div>
                          <div>
                              <button type="submit" className="btn btn-default" disabled={submitting}>
                                  {submitting ? <i/> : <i/>} {"Login"}
                              </button>
                          </div>
                      </form>
                  </Panel>
              </Center>
            </Container>
          </div>
        )
    }
}

Login.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  resetForm: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
}

export default reduxForm({
  form: 'Login',
  fields,
  validate
})(Login)
