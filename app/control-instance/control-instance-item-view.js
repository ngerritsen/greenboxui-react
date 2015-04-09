import React from 'react';
import ControlInstanceActions from './control-instance-actions';

export default React.createClass({
    propTypes: {
      control: React.PropTypes.object
    },
    _handleRemoveControl(event) {
        event.preventDefault();
        ControlInstanceActions.removeControl(this.props.control.instanceId);
    },
    render() {
        const control = this.props.control;
        return (
            <li>{control.controlTypeId}: {control.name}
                <a href="#" onClick={this._handleRemoveControl}>Delete</a>
            </li>
        );
    }
});