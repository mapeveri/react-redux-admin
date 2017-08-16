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
    * @method: isUpdate 
    * @description: Check if is update
    */
    isUpdate() {
        return this.props.params.paramId !== undefined;
    }

    /**
    * @method: getRecord
    * @description: Get record in edit mode
    */
    getRecord() {
        let id = this.props.params.paramId;
        //Url to get data
        let url = this.props.route.data.api + this.props.route.data.model + '/' + id;
        //If is edit
        if (this.isUpdate()) {
            this.props.getDataRecord(url);
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
            if(this.isUpdate()) {
                setForm.push(getField(fields[field], true, this.props.record, field));
            } else {
                setForm.push(getField(fields[field], false, null, field));
            }
        }

        return setForm;
    }

    handleSubmit(e) {
        e.preventDefault();
        let data = {};
        let fields = this.props.route.data.fields;
        let values = e.target;

        for(let field in fields) {
            data[field] = values[field].value;
        };
        
        //If is update
        if (this.isUpdate()) {
            let url = this.props.route.data.api + this.props.route.data.model + '/' + this.props.params.paramId;
            this.props.updateRecord(url, JSON.stringify(data));
            location.href = '#/' + this.props.route.data.model.toLocaleLowerCase();
        } else {
            //Is create
            let url = this.props.route.data.api + this.props.route.data.model
            this.props.insertRecord(url, JSON.stringify(data));
            //Clear form
            document.forms[0].reset();
        }
    }

    render() {
        let data = this.props.route.data;
        let title_form = '';
        if (this.isUpdate()) {
            title_form = 'Edit ' + capitalizeFirstLetter(data.title_crud);
        } else {
            title_form = 'Create ' + capitalizeFirstLetter(data.title_crud);
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
                                {this.props.isFetching && this.setFields(data)}
                                <input type="submit" className="btn btn-default" value={"Send"} />
                                <a href={urlBack} style={{marginLeft: '5px'}} className="btn btn-default">Back to {model}</a>
                            </form>
                        </Panel>
                    </Center>
                </Container>    
            </div>
        );
    }
}

FormCrud.propTypes = {
    data: PropTypes.object
}

function mapStateToProps(state) {
    return {
        record: state.Crud.data_api,
        isFetching: state.Crud.isFetching,
    }
}

//Conect component to redux
export default connect(mapStateToProps, {getDataRecord, insertRecord, updateRecord})(FormCrud);
