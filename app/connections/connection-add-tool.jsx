import React from 'react';
import ConnectionActions from './connection-actions';
import ControlInstanceStore from '../control-instance/control-instance-store';
import _ from 'underscore';

export default React.createClass({
    getInitialState() {
        return {
            controls: [],
            selectedSourceType: '',
            selectedTargetType: ''
        }
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
    _getAvailableControlTypes() {
        return _(_(this.state.controls).pluck('typeId')).uniq();
    },
    _handleAddConnection(event) {
        event.preventDefault();

        const sourceControlInstanceId = React.findDOMNode(this.refs.selectedSourceControl).value;
        const targetControlInstanceId = React.findDOMNode(this.refs.selectedTargetControl).value;

        const sourceControl = _(this.state.controls).find((control) => control.instanceId == sourceControlInstanceId);
        const targetControl = _(this.state.controls).find((control) => control.instanceId == targetControlInstanceId);

        ConnectionActions.addConnection(sourceControl, targetControl);

    },
    _handleChangeSelectedType(event) {
        event.preventDefault();

        const sourceControlType = React.findDOMNode(this.refs.selectedSourceType).value;
        const targetControlType = React.findDOMNode(this.refs.selectedTargetType).value;

        this.setState({
            selectedSourceType: sourceControlType,
            selectedTargetType: targetControlType
        });
    },
    render() {
        const controlTypeOptions = this._getAvailableControlTypes().map((type) => {
            return <option value={type} key={type}>{type}</option>;
        });

        const sourceControlOptions = this.state.controls.map((control) => {
            const option = <option value={control.instanceId} key={control.instanceId}>{control.name}</option>;
            if (control.typeId === this.state.selectedSourceType) {
                return option;
            }
            else if(!this.state.selectedSourceType && control.typeId === this._getAvailableControlTypes()[0]) {
                console.log(`${control.typeId} ${this._getAvailableControlTypes()[0]}`)
                return option;
            }
        });

        const targetControlOptions = this.state.controls.map((control) => {
            const option = <option value={control.instanceId} key={control.instanceId}>{control.name}</option>;
            if (control.typeId === this.state.selectedTargetType) {
                return option;
            }
            else if(!this.state.selectedTargetType && control.typeId === this._getAvailableControlTypes()[0]) {
                return option;
            }
        });

        return (
            <form>
                <div className="row">
                    <div className="small-5 columns">
                        <div className="row">
                            <div className="small-6 columns">
                                <label>Source Type
                                    <select ref="selectedSourceType" onChange={this._handleChangeSelectedType}>
                                        {controlTypeOptions}
                                    </select>
                                </label>
                            </div>
                            <div className="small-6 columns">
                                <label>Source Control
                                    <select ref="selectedSourceControl" defaultValue={controlTypeOptions[0]}>
                                        {sourceControlOptions}
                                    </select>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="small-5 columns">
                        <div className="row">
                            <div className="small-6 columns">
                                <label>Target Type
                                    <select ref="selectedTargetType" onChange={this._handleChangeSelectedType}>
                                        {controlTypeOptions}
                                    </select>
                                </label>
                            </div>
                            <div className="small-6 columns">
                                <label>Target Control
                                    <select ref="selectedTargetControl" defaultValue={controlTypeOptions[0]}>
                                        {targetControlOptions}
                                    </select>
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="small-2 columns">
                        <button type="submit" className="button radius button-form" onClick={this._handleAddConnection}>Add Connection</button>
                    </div>
                </div>
            </form>
        );
    }
});