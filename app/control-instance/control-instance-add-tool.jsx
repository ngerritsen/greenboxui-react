import React from 'react';
import Immutable from 'immutable';
import shortId from 'shortid';
import Reflux from 'reflux';
import Translator from '../translation/translator';
import ControlInstanceActions from './control-instance-actions';
import LicenseStore from '../license/license-store';
import LicenseActions from '../license/license-actions';

export default React.createClass({
    mixins: [Reflux.ListenerMixin],
    getInitialState() {
        return { availableLicense: LicenseStore.getAvailableTypes() }
    },
    componentDidMount() {
        this.listenTo(LicenseStore, this._onLicenseChange, this._onLicenseChange);
    },
    _onLicenseChange() {
        this.setState({ availableLicense: LicenseStore.getAvailableTypes() });
    },
    _handleAddControl(event) {
        event.preventDefault();

        const controlTypeId = React.findDOMNode(this.refs.selectedControlType).value;
        let controlAmountNode = React.findDOMNode(this.refs.controlAmountInput);
        let controlAmount = parseInt(React.findDOMNode(this.refs.controlAmountInput).value);
        let controlNameNode = React.findDOMNode(this.refs.controlNameInput);
        const controlName = controlNameNode.value.trim();

        const licenseSlot = this.state.availableLicense.find((slot) => slot.controlTypeId === controlTypeId);

        if(controlName && controlAmount > 0 && controlAmount <= licenseSlot.available) {
            if (controlAmount > 1) {
                for (let i = 1; i <= controlAmount; i++) {
                    ControlInstanceActions.addControl(controlTypeId, `${controlName} ${i}`);
                }
            }
            else {
                ControlInstanceActions.addControl(controlTypeId, controlName);
                controlNameNode.value = '';
                controlAmountNode.value = 1;
            }
        }
    },
    render() {
        const controlTypeOptions = this.state.availableLicense.map((slot) => {
            return (
                <option value={slot.controlTypeId} key={slot.controlTypeId}>
                    {`${slot.controlTypeName} (${slot.used}/${slot.total})`}
                </option>
            );
        });

        return (
            <form>
                <div className="row">
                    <div className="small-4 columns">
                        <label>
                            <Translator id="controlType"/>
                            <select ref="selectedControlType">
                                {controlTypeOptions}
                            </select>
                        </label>
                    </div>
                    <div className="small-4 columns">
                        <label>
                            <Translator id="controlName"/>
                            <input type="text" ref="controlNameInput"/>
                        </label>
                    </div>
                    <div className="small-2 columns">
                        <label>
                            <Translator id="amount"/>
                            <input type="number" ref="controlAmountInput" defaultValue="1"/>
                        </label>
                    </div>
                    <div className="small-2 columns">
                        <button type="submit" className="button radius button-form" onClick={this._handleAddControl}>
                            <Translator id="addControl"/>
                        </button>
                    </div>
                </div>
            </form>
        );
    }
});