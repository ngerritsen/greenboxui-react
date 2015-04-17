import React from 'react';
import ControlInstanceActions from './control-instance-actions';

export default React.createClass({
    _handleAddControl(event) {
        event.preventDefault();

        const controlType = React.findDOMNode(this.refs.selectedControlType).value;
        let controlAmountNode = React.findDOMNode(this.refs.controlAmountInput);
        let controlAmount = React.findDOMNode(this.refs.controlAmountInput).value;
        let controlNameNode = React.findDOMNode(this.refs.controlNameInput);
        const controlName = controlNameNode.value.trim();

        if (controlName) {
            if (controlAmount > 1) {
                for(let i = 1; i <= controlAmount; i++) {
                    ControlInstanceActions.addControl(controlType, `${controlName} ${i}`);
                }
            }
            else {
                ControlInstanceActions.addControl(controlType, controlName);
            }

            controlNameNode.value = '';
            controlAmountNode.value = 1;
        }
    },
    render() {
        const controlTypes = ['Pump', 'Crop Section', 'Valve', 'Meteo', 'Fan', 'Custom Alarm'];
        const controlTypeOptions = controlTypes.map((type) => {
            return <option value={type} key={type}>{type}</option>
        });

        return (
            <form>
                <div className="row">
                    <div className="small-4 columns">
                        <label>Control Type
                            <select ref="selectedControlType">
                                {controlTypeOptions}
                            </select>
                        </label>
                    </div>
                    <div className="small-4 columns">
                        <label>Control Name
                            <input type="text" ref="controlNameInput"/>
                        </label>
                    </div>
                    <div className="small-2 columns">
                        <label>Amount
                            <input type="number" ref="controlAmountInput" defaultValue="1"/>
                        </label>
                    </div>
                    <div className="small-2 columns">
                        <button type="submit" className="button radius button-form" onClick={this._handleAddControl}>Add Control</button>
                    </div>
                </div>
            </form>
        );
    }
});