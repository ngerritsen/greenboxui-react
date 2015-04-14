import React from 'react';
import ConnectionActions from './connection-actions';
import ControlInstanceStore from '../control-instance/control-instance-store';

export default React.createClass({
    getInitialState() {
        return { controls: [] }
    },
    componentDidMount() {
        ControlInstanceStore.listen(this._onChange);
        this._onChange();
    },
    componentWillUnmount() {
        ControlInstanceStore.unlisten(this._onChange)
    },
    _onChange() {
        const newControls = ControlInstanceStore.getState().controls;
        this.setState({ controls: newControls });
    },
    _handleAddConnection(event) {
        event.preventDefault();

        const controlType = React.findDOMNode(this.refs.selectedControlType).value;
        let controlNameNode = React.findDOMNode(this.refs.controlNameInput);
        const controlName = controlNameNode.value.trim();

        if (controlName) {
            ConnectionActions.addControl(controlType, controlName);
            controlNameNode.value = '';
        }
    },
    render() {
        const controlOptions = this.state.controls.map((control => {
            return <option value={control.instanceId} key={control.instanceId}>{control.name}</option>
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