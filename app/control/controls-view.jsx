import Immutable from 'immutable';
import React from 'react';
import Reflux from 'reflux';

import Content from '../shared/content';
import ControlInstanceStore from '../control-instance/control-instance-store';
import ControlTypeStore from '../control-instance/control-type-store';
import Grid from '../shared/grid/grid';
import GridCellTypes from '../shared/grid/grid-cell-types';
import LicenseStore from '../license/license-store';
import ParameterStore from '../parameters/parameter-store';
import ParameterActions from '../parameters/parameter-actions';
import ParameterAccessLevels from '../parameters/parameter-access-levels';
import Slab from '../shared/slab';
import Section from '../shared/section';
import SelectionBox from '../shared/selection-box';
import SettingsStore from '../settings/settings-store';
import TranslationMixin from '../translation/translation-mixin';

export default React.createClass({
    mixins: [
        TranslationMixin,
        Reflux.ListenerMixin,
        Reflux.connect(ParameterStore, 'parameters')
    ],
    translations: ['name', 'value', 'unit', 'all', 'controlType', 'controlInstance'],
    getInitialState() {
        return {
            controls: Immutable.List(),
            parameters: ParameterStore.parameters,
            registeredParameters: Immutable.List(),
            selectedControlInstanceId: ''
        }
    },
    componentDidMount() {
        this.listenTo(ControlInstanceStore, this._onChangeControls);
        this._onChangeControls();
    },
    componentWillUnmount() {
        this.state.registeredParameters.forEach((parameter) => {
            ParameterActions.unregisterParameter(parameter.controlTypeId, parameter.parameterId);
        });
    },
    _onChangeControls() {
        const oldControls = this.state.controls;
        const newControls = ControlInstanceStore.controls;
        this.setState({ controls: newControls });
        this._processControls(oldControls, newControls);
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
        setTimeout(() => ParameterActions.refreshParameters(ParameterStore.parameters), 100);

        this.setState({ registeredParameters: registeredParameters });
    },
    _handleSelectControl(controlInstanceId) {
        this.setState({ selectedControlInstanceId: controlInstanceId });
    },
    _handleSelectControlType(controlTypeId) {
        this.setState({ selectedControlTypeId: controlTypeId, selectedControlInstanceId: '' });
    },
    _handleSetParameter(newValue, context) {
        const {controlInstanceId, parameterId, value} = context;
        ParameterActions.setParameter(controlInstanceId, parameterId, newValue, value);
    },
    render() {
        const {controls, parameters, selectedControlInstanceId, selectedControlTypeId} = this.state;
        const userLevel = SettingsStore.settings.get('user');

        let parametersToShow = parameters.filter((param) => param[userLevel] !== ParameterAccessLevels.hidden);

        const columnInfo = [
            { title: this.getTranslation('name'), columns: 6, id: 'name' },
            { title: this.getTranslation('value'), columns: 3, id: 'value',
                type: ((data) => data[userLevel] === ParameterAccessLevels.fullAccess ? GridCellTypes.editable : GridCellTypes.readonly),
                handler: this._handleSetParameter
            },
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

        const controlTypeOptions = ControlTypeStore.controlTypes
                .map((type) => { return { value: type.id, label: type.name }} )
                .unshift({ value: '', label: this.getTranslation('all') });

        return (
            <div>
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
                </Slab>
                <Slab>
                    <Grid
                        columnInfo={columnInfo}
                        data={parametersToShow.toArray()}
                        pagination={20}
                    />
                </Slab>
            </div>
        );
    }
});