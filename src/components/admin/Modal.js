import React, { Component, PropTypes } from 'react';

/**
* Modal component
*/
export default class Modal extends Component {
  constructor(props, context) {
    super(props, context);
  }

  /**
  * @method: onSubmit
  * @description: Event submit modal form
  */
  onSubmit() {
    this.props.submit();
  }

  render() {
      return (
        <div className='modal fade' id={'modal_' + this.props.id} role='dialog' aria-labelledby={'myModalLabel_' + this.props.id}>
          <div className='modal-dialog' role='document'>
            <div className='modal-content'>
              <div className='modal-header'>
                <h4 className='modal-title' id={'myModalLabel_' + this.props.id}>{this.props.title}</h4>
                <button type='button' className='close' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'>&times;</span></button>
              </div>
              <div className='modal-body'>
                {this.props.content}
              </div>
              <div className='modal-footer'>
                <button type='button' className='btn btn-dark' data-dismiss='modal'>Close</button>
                <button type='button' className='btn btn-primary' onClick={this.onSubmit.bind(this)}>Save</button>
              </div>
            </div>
          </div>
        </div>
      );
  }
}

Modal.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  submit: PropTypes.func.isRequired,
}
