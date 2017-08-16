import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';

import Center from '../../components/admin/Center';
import Container from '../../components/admin/Container';
import Navbar from '../../components/admin/Navbar';
import Panel from '../../components/admin/Panel';

/**
* Login page container
*/
class Login extends Component {
    constructor(props, context) {
        super(props, context);
    }

    /**
    * @method: handleSubmit
    * @description: Submit form
    */
    handleSubmit(data, dispatch) {
        //hashHistory.push('/admin/index');
    }

    render() {
        let data = this.props.route.data;
        return (
            <div>
                <Navbar name_admin={ data.name_admin } />
                <Container>
                <Center>
                    <Panel title={"Login"} width_panel="50%">
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="Username" />
                            </div>
                            <div className="form-group">
                                <input type="password" className="form-control" placeholder="Password"/>
                            </div>
                            <div>
                                <button type="submit" className="btn btn-default">
                                    {"Login"}
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
}

//Conect component to redux
export default connect()(Login);