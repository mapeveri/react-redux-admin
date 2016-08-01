import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import { hashHistory } from 'react-router';
import { reduxForm } from 'redux-form';

import Container from '../../components/admin/Container';
import Navbar from '../../components/admin/Navbar';

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

class Login extends Component {
    constructor(props, context) {
        super(props, context);
    }

    /*
    method: handleSubmit
    descrip: Submit form
    */
    handleSubmit(data, dispatch) {
        //hashHistory.push('/admin/index');
    }

    render() {
        const { fields: { username, password }, resetForm, handleSubmit, submitting  } = this.props;
        return (
            <div>
                <Navbar />
                <Container>
                    <div className="panel panel-default">
                      <div className="panel-heading">
                        <h3 className="panel-title">Login</h3>
                      </div>
                      <div className="panel-body">
                        <form onSubmit={handleSubmit(this.handleSubmit)}>
                            <div>
                                <div>
                                    <input type="text" className="form-control" placeholder="Username" {...username} />
                                </div>
                                {username.touched && username.error && <div style={{"color": "red"}}>{username.error}</div>}
                            </div>
                            <div>
                                <div>
                                    <input type="password" className="form-control" placeholder="Password" {...password} />
                                </div>
                                {password.touched && password.error && <div style={{"color": "red"}}>{password.error}</div>}
                            </div>
                            <div>
                                <button type="submit" disabled={submitting}>
                                    {submitting ? <i/> : <i/>} {"Login"}
                                </button>
                            </div>
                        </form>
                      </div>
                    </div>
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
