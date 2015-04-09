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
            <li className="grid-row row clearfix">
                <div className="grid-cell column small-5">{control.typeId}</div>
                <div className="grid-cell column small-5">{control.name}</div>
                <div className="grid-cell column small-2"><a href="#" onClick={this._handleRemoveControl}>Delete</a></div>
            </li>
        );
    }
});