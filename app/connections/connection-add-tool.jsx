import React from 'react';
import ConnectionActions from './connection-actions';
import ControlInstanceStore from '../control-instance/control-instance-store';
import _ from 'underscore';

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

        const sourceControlInstanceId = React.findDOMNode(this.refs.selectedSourceControl).value;
        const targetControlInstanceId = React.findDOMNode(this.refs.selectedTargetControl).value;

        const sourceControl = _(this.state.controls).find((control) => control.instanceId == sourceControlInstanceId);
        const targetControl = _(this.state.controls).find((control) => control.instanceId == targetControlInstanceId);

        ConnectionActions.addConnection(sourceControl, targetControl);

    },
    render() {
        const controlOptions = this.state.controls.map((control) => {
            return <option value={control.instanceId} key={control.instanceId}>{control.name}</option>;
        });

        return (
            <form>
                <div className="row">
                    <div className="small-5 columns">
                        <label>Source Control
                            <select ref="selectedSourceControl">
                                {controlOptions}
                            </select>
                        </label>
                    </div>
                    <div className="small-5 columns">
                        <label>Target Control
                            <select ref="selectedTargetControl">
                                {controlOptions}
                            </select>
                        </label>
                    </div>

                    <div className="small-2 columns">
                        <button type="submit" className="button radius small button-form" onClick={this._handleAddConnection}>Add Connection</button>
                    </div>
                </div>
            </form>
        );
    }
});