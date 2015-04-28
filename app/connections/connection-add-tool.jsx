import React from 'react';
import Immutable from 'immutable';
import ListenerMixin from 'alt/mixins/ListenerMixin';
import LicenseStore from '../license/license-store';
import TranslationMixin from '../translation/translation-mixin';
import Translator from '../translation/translator';
import ConnectionActions from './connection-actions';
import ControlInstanceStore from '../control-instance/control-instance-store';
import Connection from './connection';

export default React.createClass({
    mixins: [ListenerMixin],
    getInitialState() {
        return {
            controls: Immutable.List(),
            selectedSourceType: '',
            selectedTargetType: ''
        }
    },
    componentDidMount() {
        this.listenTo(ControlInstanceStore, this._onChange);
        this._onChange();
    },
    _onChange() {
        const newControls = ControlInstanceStore.getState().controls;
        this.setState({ controls: newControls });
    },
    _getAvailableControlTypes() {
        return this.state.controls.toSeq()
            .filter((control) => !control.dirty)
            .map((control) => control.typeId)
            .toOrderedSet().toList();
    },
    _getSelectedSourceType() {
        return this.state.selectedSourceType ? this.state.selectedSourceType : this._getAvailableControlTypes().get(0);

    },
    _getSelectedTargetType() {
        return this.state.selectedTargetType ? this.state.selectedTargetType : this._getAvailableControlTypes().get(0);
    },
    _handleAddConnection(event) {
        event.preventDefault();

        const sourceControlInstanceId = React.findDOMNode(this.refs.selectedSourceControl).value;
        const targetControlInstanceId = React.findDOMNode(this.refs.selectedTargetControl).value;
        const sourceControl = this.state.controls.find((control) => control.instanceId == sourceControlInstanceId);
        const targetControl = this.state.controls.find((control) => control.instanceId == targetControlInstanceId);

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
            return <option value={type} key={type}>{LicenseStore.getControlTypeName(type)}</option>;
        });

        const availableSourceControlOptions = this.state.controls.filter((control) => control.typeId === this._getSelectedSourceType() && control.instanceId);
        const sourceControlOptions = availableSourceControlOptions.map((control) => {
            return <option value={control.instanceId} key={control.instanceId}>{control.name}</option>;
        });

        const availableTargetControlOptions = this.state.controls.filter((control) => control.typeId === this._getSelectedTargetType() && control.instanceId);
        const targetControlOptions = availableTargetControlOptions.map((control) => {
            return <option value={control.instanceId} key={control.instanceId}>{control.name}</option>;
        });

        return (
            <form>
                <div className="row">
                    <div className="medium-12 large-5 columns">
                        <div className="row">
                            <div className="small-12 medium-6 columns">
                                <label>
                                    <Translator id="sourceType"/>
                                    <select ref="selectedSourceType" onChange={this._handleChangeSelectedType}>
                                        {controlTypeOptions}
                                    </select>
                                </label>
                            </div>
                            <div className="small-12 medium-6 columns">
                                <label>
                                    <Translator id="sourceInstance"/>
                                    <select ref="selectedSourceControl" defaultValue={controlTypeOptions[0]}>
                                        {sourceControlOptions}
                                    </select>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="medium-12 large-5 columns">
                        <div className="row">
                            <div className="small-12 medium-6 columns">
                                <label>
                                    <Translator id="targetType"/>
                                    <select ref="selectedTargetType" onChange={this._handleChangeSelectedType}>
                                        {controlTypeOptions}
                                    </select>
                                </label>
                            </div>
                            <div className="small-12 medium-6 columns">
                                <label>
                                    <Translator id="targetInstance"/>
                                    <select ref="selectedTargetControl" defaultValue={controlTypeOptions[0]}>
                                        {targetControlOptions}
                                    </select>
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="medium-12 large-2 columns">
                        <button type="submit" className="button radius button-form" onClick={this._handleAddConnection}>
                            <Translator id="addConnection"/>
                        </button>
                    </div>
                </div>
            </form>
        );
    }
});