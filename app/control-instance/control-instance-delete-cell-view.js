import React from 'react';
import ControlInstanceActions from './control-instance-actions';

export default React.createClass({
    propTypes: {
      data: React.PropTypes.object
    },
    _handleRemoveControl(event) {
        event.preventDefault();
        ControlInstanceActions.removeControl(this.props.data.instanceId);
    },
    render() {
        return <a href="#" onClick={this._handleRemoveControl}>Delete</a>;
    }
});