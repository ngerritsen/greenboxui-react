import React from 'react';
import Immutable from 'immutable';
import ControlInstanceActions from './control-instance-actions';
import LicenseStore from '../license/license-store';
import LicenseActions from '../license/license-actions';

export default React.createClass({
    getInitialState() {
        return { license: Immutable.List() }
    },
    componentDidMount() {
        LicenseStore.listen(this._onChange);
        this._onChange();
    },
    componentWillUnmount() {
        LicenseStore.unlisten(this._onChange)
    },
    _onChange() {
        const newLicense = LicenseStore.getState().license;
        this.setState({license: newLicense});
    },
    _licenseSlotsAvailable(controlTypeId) {
        const slot = this.state.license.find((slot) => slot.controlTypeId === controlTypeId);
        return slot.total - slot.used;
    },
    _handleAddControl(event) {
        event.preventDefault();

        const controlType = React.findDOMNode(this.refs.selectedControlType).value;
        let controlAmountNode = React.findDOMNode(this.refs.controlAmountInput);
        let controlAmount = parseInt(React.findDOMNode(this.refs.controlAmountInput).value);
        let controlNameNode = React.findDOMNode(this.refs.controlNameInput);
        const controlName = controlNameNode.value.trim();

        if(controlName && controlAmount > 0 && controlAmount <= this._licenseSlotsAvailable(controlType)) {
            LicenseActions.useLicenseSlot(controlType, controlAmount);

            if (controlAmount > 1) {
                for (let i = 1; i <= controlAmount; i++) {
                    ControlInstanceActions.addControl(controlType, `${controlName} ${i}`);
                }
            }
            else {
                ControlInstanceActions.addControl(controlType, controlName);

                controlNameNode.value = '';
                controlAmountNode.value = 1;
            }
        }
    },
    render() {
        const availableControlTypes = this.state.license.filter((slot) =>  slot.total > 0 && slot.used < slot.total);
        const controlTypeOptions = availableControlTypes.map((slot) => {
            return (
                <option value={slot.controlTypeId} key={slot.controlTypeId}>
                    {`${slot.controlTypeId} (${slot.used}/${slot.total})`}
                </option>
            );
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