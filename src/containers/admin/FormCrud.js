import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';

import Center from '../../components/admin/Center';
import Container from '../../components/admin/Container';
import Navbar from '../../components/admin/Navbar';
import Panel from '../../components/admin/Panel';

import { capitalizeFirstLetter, getField } from '../../utils/utils';
import { getDataRecord, insertRecord, updateRecord } from '../../actions/admin';

/**
* Form Create/Update crud
*/
class FormCrud extends Component {
    constructor(props, context) {
        super(props, context);
    }

    /**
    * @method: componentDidMount
    * @description: To init component
    */
    componentDidMount() {
        this.getRecord();
    }

    /**
    * @method: getRecord
    * @description: Get record in edit mode
    */
    getRecord() {
        let id = this.props.params.paramId;

        //If is edit
        if (typeof(id) !== 'undefined') {
            this.props.getDataRecord(
                this.props.route.data.api, this.props.route.data.model, id
            );
        }
    }

    /**
    * @method: setFields
    * @description: Set fields crud to form
    * @param: data {object}: Data crud
    */
    setFields(data) {
        let setForm = [];
        let fields = data.fields;
        for(let field in fields) {
            if(data.action == '') {
                setForm.push(getField(fields[field], false, null, field));
            } else {
                setForm.push(getField(fields[field], true, this.props.record, field));
            }
        }

        return setForm;
    }

    handleSubmit(e) {
        e.preventDefault();
        //$("#formcrud").validate();
        let data = {};
        let fields = this.props.route.data.fields;
        let values = e.target;

        for(let field in fields) {
            data[field] = values[field].value;
        };
        
        //If is create
        if (this.props.params.paramId === undefined) {
            this.props.insertRecord(
                this.props.route.data.api, this.props.route.data.model, JSON.stringify(data)
            )
            //Clear form
            document.forms[0].reset();
        } else {
            //Is update
            this.props.updateRecord(
                this.props.route.data.api, this.props.params.paramId, this.props.route.data.model, JSON.stringify(data)
            )

            location.href = '#/' + this.props.route.data.model.toLocaleLowerCase();
        }
    }

    render() {
        let data = this.props.route.data;
        let title_form = '';
        if (data.action == 'c') {
            title_form = 'Create ' + capitalizeFirstLetter(data.title_crud);
        } else {
            title_form = 'Edit ' + capitalizeFirstLetter(data.title_crud);
        }

        let model = data.model.toLocaleLowerCase();
        let urlBack = '#/' + model;

        return (
            <div>
                <Navbar name_admin={ data.name_admin } />
                <Container>
                    <Center>
                        <Panel title={title_form} width_panel="90%" style={{marginBottom: '1em'}}>
                            <form id="formcrud" name="formcrud" onSubmit={this.handleSubmit.bind(this)}>
                                {this.setFields(data)}
                                <input type="submit" className="btn btn-default" value={"Send"} />
                                <a href={urlBack} className="btn btn-default">Back to {model}</a>
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

function mapStateToProps(state) {
    return {
        record: state.Crud.data_api,
        isFetching: state.Crud.isFetching,
    }
}

//Conect component to redux
export default connect(mapStateToProps, {getDataRecord, insertRecord, updateRecord})(FormCrud);
