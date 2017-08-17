import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';

import { getDataCombo } from '../../actions/admin';

/**
* ComboBox component
*/
class ComboBox extends Component {
    constructor(props, context) {
        super(props, context);
    }

    /**
    * @method: componentDidMount
    * @description: To init component
    */
    componentDidMount() {
        let url = this.props.api + this.props.relation;
        this.props.getDataCombo(url);
    }

    /**
    * @method: renderOptions 
    * @description: Render option select
    * @return array
    */
    renderOptions() {
        let arrOption = [];

        if(!this.props.required) {
            arrOption.push(<option value="-1"></option>);
        }

        this.props.data_api.map((item, i) => {
            arrOption.push(<option key={i} value={item[this.props.pk]}>{ item.name }</option>);
        });

        return arrOption;
    }

    render() {
        return (
            <div className="form-group">
                <label>{this.props.placeholder}</label>
                <select className={"form-control"} name={this.props.name} 
                    id={this.props.id} placeholder={this.props.placeholder} 
                    required={this.props.required} defaultValue={this.props.value}>
                        {this.renderOptions()}
                </select>
            </div>
        );
    }
}

ComboBox.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    required: PropTypes.bool.isRequired,
    value: PropTypes.string.isRequired,
    relation: PropTypes.string.isRequired,
    api: PropTypes.string.isRequired,
    pk: PropTypes.string.isRequired,
}

function mapStateToProps(state) {
    return {
        data_api: state.Combo.data_api,
        action: state.Combo.action,
    }
}

//Conect component to redux
export default connect(mapStateToProps, {getDataCombo})(ComboBox);
