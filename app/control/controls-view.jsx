import React from 'react';
import Immutable from 'immutable';
import AutoListenerMixin from '../shared/auto-listener-mixin';
import TranslationMixin from '../translation/translation-mixin';
import ControlInstanceStore from '../control-instance/control-instance-store';
import ControlTypeStore from '../control-instance/control-type-store';
import LicenseStore from '../license/license-store';
import ParameterStore from '../parameters/parameter-store';
import ParameterActions from '../parameters/parameter-actions';
import Grid from '../shared/grid/grid';
import Slab from '../shared/slab';
import Content from '../shared/content';
import Section from '../shared/section';
import SelectionBox from '../shared/selection-box';

export default React.createClass({
    mixins: [AutoListenerMixin, TranslationMixin],
    translations: ['name', 'value', 'unit', 'all', 'controlType', 'controlInstance'],
    getInitialState() {
        return {
            controls: Immutable.List(),
            parameters: Immutable.List(),
            registeredParameters: Immutable.List(),
            selectedControlInstanceId: ''
        }
    },
    componentDidMount() {
        this.listenToAuto(ControlInstanceStore, this._onChangeControls);
        this.listenToAuto(ParameterStore, this._onChangeParams);
    },
    componentWillUnmount() {
        this.state.registeredParameters.forEach((parameter) => {
            ParameterActions.unregisterParameter(parameter.controlTypeId, parameter.parameterId);
        });
    },
    _onChangeControls() {
        const oldControls = this.state.controls;
        const newControls = ControlInstanceStore.getState().controls;
        this.setState({ controls: newControls });
        this._processControls(oldControls, newControls);
    },
    _onChangeParams() {
        this.setState({ parameters: ParameterStore.getState().parameters });
    },
    _processControls(oldControls, newControls) {
        const reallyNewControls = newControls.filter((newControl) => {
            const existing = oldControls.find((oldControl) => oldControl.instanceId !== newControl.instanceId);
            return existing ? false : true;
        });

        this._registerNewParametersFromControls(reallyNewControls);
    },
    _registerNewParametersFromControls(reallyNewControls) {
        let registeredParameters = Immutable.List();
        reallyNewControls.forEach((control) => {
            control.parameters.forEach((parameter) => {
                ParameterActions.registerParameter(control.instanceId, parameter.parameterId);
                registeredParameters = registeredParameters.push({
                    controlInstanceId: control.instanceId,
                    parameterId: parameter.parameterId
                });
            });
        });

        this.setState({ registeredParameters: registeredParameters });
    },
    _handleSelectControl(controlInstanceId) {
        this.setState({ selectedControlInstanceId: controlInstanceId });
    },
    _handleSelectControlType(controlTypeId) {
        this.setState({ selectedControlTypeId: controlTypeId, selectedControlInstanceId: '' });
    },
    render() {
        const {controls, parameters, selectedControlInstanceId, selectedControlTypeId} = this.state;

        let parametersToShow = parameters;
        const columnInfo = [
            { title: this.getTranslation('name'), columns: 6, id: 'name' },
            { title: this.getTranslation('value'), columns: 3, id: 'value'},
            { title: this.getTranslation('unit'), columns: 3, id: 'unit'}
        ];

        if(!selectedControlInstanceId && selectedControlTypeId) {
            parametersToShow = parameters.filter((parameter) => {
                const relatedControl = controls.find((control) => control.instanceId === parameter.controlInstanceId);
                return selectedControlTypeId=== relatedControl.typeId;
            });
        }
        else if(selectedControlInstanceId) {
            parametersToShow = parameters.filter((parameter) => parameter.controlInstanceId === selectedControlInstanceId);
        }

        const controlOptions =
            controls
                .filter((control) => control.typeId === selectedControlTypeId)
                .map((control) => { return { value: control.instanceId, label: control.name }} )
                .unshift({ value: '', label: this.getTranslation('all') });

        const controlTypeOptions = ControlTypeStore.getState().controlTypes
                .map((type) => { return { value: type.id, label: type.name }} )
                .unshift({ value: '', label: this.getTranslation('all') });

        return (
            <Content>
                <Section>
                    <Slab>
                        <div className="row">
                            <div className="small-6 columns">
                                <label>{this.getTranslation('controlType')}
                                    <SelectionBox options={controlTypeOptions} handler={this._handleSelectControlType} ref="controlTypeSelection"/>
                                </label>
                            </div>
                            <div className="small-6 columns">
                                <label>{this.getTranslation('controlInstance')}
                                    <SelectionBox options={controlOptions} handler={this._handleSelectControl}  ref="controlSelection"/>
                                </label>
                            </div>
                        </div>
                        <hr></hr>
                        <Grid
                            columnInfo={columnInfo}
                            data={parametersToShow.toArray()}
                        />
                    </Slab>
                </Section>
            </Content>
        );
    }
});