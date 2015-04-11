import React from 'react';
import ControlInstanceActions from './control-instance-actions';

export default React.createClass({
    propTypes: {
      context: React.PropTypes.object
    },
    _handleRemoveControl(event) {
        event.preventDefault();
        ControlInstanceActions.removeControl(this.props.context.instanceId);
    },
    render() {
        return <i className="fa fa-trash clickable" onClick={this._handleRemoveControl}></i>;
    }
});