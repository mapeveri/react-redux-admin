import React, { Component, PropTypes } from 'react';
import { getModels, getSections } from '../../utils/utils';

/**
* Panel div component
*/
export default class PanelSections extends Component {
    constructor(props, context) {
      super(props, context);
    }

    /**
    * @method: renderSections
    * @description: List models for section
    */
    renderSections() {
      let panels = [];
      let sections = getSections(this.props.data)
      sections.forEach((section) => {
        panels.push(<div key={section} className="panel panel-default">
          <div className="panel-heading">
            <h4 className="panel-title">
              { section }
            </h4>
          </div>
          <div className="panel">
            <div className="panel-body">
              { this.renderModels(section) }
            </div>
          </div>
        </div>);
      });

      return panels;
    }

    /**
    * @method: renderModels
    * @description: Render models to sections in list-group
    * @param section {string}: Section to which the models belongs
    */
    renderModels(section) {
      let arrModels = [];
      let models = getModels(this.props.data, section);
      models.forEach((model, i) => {
        arrModels.push(<a href={'#/' + model.toLowerCase()} className="list-group-item">{model}</a>);
      });

      return <div className="list-group">
          {arrModels}
      </div>
    }

    render() {
        return (
          <div className="panel-group" id="accordion" role="tablist" ariaMultiselectable="true">
            { this.renderSections() }
          </div>
        );
    }
}

PanelSections.propTypes = {
  data: PropTypes.object.isRequired,
}
