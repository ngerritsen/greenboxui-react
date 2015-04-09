import React from 'react';
import ControlInstanceActions from './control-instance-actions';

export default React.createClass({
    _handleAddControl(event) {
        event.preventDefault();
        const controlType = React.findDOMNode(this.refs.selectedControlType).value;
        const controlName = React.findDOMNode(this.refs.controlNameInput).value;
        ControlInstanceActions.addControl(controlType, controlName);
    },
    render() {
        return (
        <form>
            <div className="row">
                <div className="small-5 columns">
                    <label>Control Type
                        <select ref="selectedControlType" defaultValue="pump">
                            <option value="pump">Pump</option>
                            <option value="valve">Valve</option>
                        </select>
                    </label>
                </div>
                <div className="small-5 columns">
                    <label>Control Name
                        <input type="text" ref="controlNameInput"/>
                    </label>
                </div>
                <div className="small-2 columns">
                    <button type="submit" className="button radius small" onClick={this._handleAddControl}>Add Control</button>
                </div>
            </div>
        </form>
    )}
});