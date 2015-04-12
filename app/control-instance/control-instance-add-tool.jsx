import React from 'react';
import ControlInstanceActions from './control-instance-actions';

export default React.createClass({
    _handleAddControl(event) {
        event.preventDefault();

        const controlType = React.findDOMNode(this.refs.selectedControlType).value;
        let controlNameNode = React.findDOMNode(this.refs.controlNameInput);
        const controlName = controlNameNode.value.trim();

        if (controlName) {
            ControlInstanceActions.addControl(controlType, controlName);
            controlNameNode.value = '';
        }
    },
    render() {
        const controlTypes = ['Pump', 'Valve', 'Meteo', 'Fan', 'Custom Alarm'];
        const controlTypeOptions = controlTypes.map((type) => {
            return <option value={type} key={type}>{type}</option>
        });

        return (
            <form>
                <div className="row">
                    <div className="small-5 columns">
                        <label>Control Type
                            <select ref="selectedControlType">
                                {controlTypeOptions}
                            </select>
                        </label>
                    </div>
                    <div className="small-5 columns">
                        <label>Control Name
                            <input type="text" ref="controlNameInput"/>
                        </label>
                    </div>
                    <div className="small-2 columns">
                        <button type="submit" className="button radius small button-form" onClick={this._handleAddControl}>Add Control</button>
                    </div>
                </div>
            </form>
        );
    }
});