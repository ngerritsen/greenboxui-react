import React from 'react';
import Slab from '../shared/slab';
import Immutable from 'immutable';
import ControlInstanceActions from '../control-instance/control-instance-actions';
import ControlInstanceStore from '../control-instance/control-instance-store';
import ConnectionActions from '../connections/connection-actions';
import LicenseStore from '../license/license-store';
import SettingsStore from '../settings/settings-store';
import SettingsActions from '../settings/settings-actions';
import Setting from './setting';
import SettingTypes from './setting-types';
import AlarmActions from '../alarms/alarm-actions.js';

export default React.createClass({
    _handleChangeProduct(product) {
        SettingsActions.setSettings(Immutable.Map({
           product: product
        }));
    },
    _handleRaiseAlarm() {
        AlarmActions.raiseAlarm('This is a dummy alarm');
    },
    render() {
        return (
            <Slab>
                <Setting label="addDummyConfig" type={SettingTypes.action} actionLabel="add" handler={this._handleAddDummyConfiguration} />
                <Setting label="raiseAnAlarm" type={SettingTypes.action} actionLabel="raise" handler={this._handleRaiseAlarm} />
                <Setting
                    label="product"
                    type={SettingTypes.selection}
                    handler={this._handleChangeProduct}
                    options={Immutable.List.of(
                        { label: 'iSii', value: 'isii' },
                        { label: 'iSii Compact', value: 'isii-compact' }
                    )}
                    defaultValue={SettingsStore.getState().settings.get('product')}
                />
            </Slab>
        );
    },
    _handleAddDummyConfiguration() {
        const {license} = LicenseStore.getState();
        ControlInstanceActions.addControl(license.get(0).controlTypeId, 'Pump1');
        ControlInstanceActions.addControl(license.get(2).controlTypeId, 'Valve 1');
        ControlInstanceActions.addControl(license.get(2).controlTypeId, 'Valve 2');
        ControlInstanceActions.addControl(license.get(2).controlTypeId, 'Valve 3');
        ControlInstanceActions.addControl(license.get(2).controlTypeId, 'Valve 4');
        ControlInstanceActions.addControl(license.get(2).controlTypeId, 'Valve 5');
        ControlInstanceActions.addControl(license.get(2).controlTypeId, 'Valve 6');
        ControlInstanceActions.addControl(license.get(2).controlTypeId, 'Valve 7');
        ControlInstanceActions.addControl(license.get(2).controlTypeId, 'Valve 8');
        ControlInstanceActions.addControl(license.get(2).controlTypeId, 'Valve 9');
        ControlInstanceActions.addControl(license.get(2).controlTypeId, 'Valve 10');
        ControlInstanceActions.addControl(license.get(1).controlTypeId, 'Strawberry Cropsection');
        ControlInstanceActions.addControl(license.get(1).controlTypeId, 'Pineapple Cropsection');
        ControlInstanceActions.addControl(license.get(6).controlTypeId, 'Strawberry Strategy');
        ControlInstanceActions.addControl(license.get(6).controlTypeId, 'Pineapple Strategy');
        ControlInstanceActions.addControl(license.get(7).controlTypeId, 'Strawberry Stage 1');
        ControlInstanceActions.addControl(license.get(7).controlTypeId, 'Strawberry Stage 2');
        ControlInstanceActions.addControl(license.get(7).controlTypeId, 'Pineapple Stage 1');
        ControlInstanceActions.addControl(license.get(7).controlTypeId, 'Pineapple Stage 2');
        ControlInstanceActions.addControl(license.get(3).controlTypeId, 'Meteo');

        const controls = ControlInstanceStore.getState().controls;

        ConnectionActions.addConnection(controls.get(0), controls.get(11));
        ConnectionActions.addConnection(controls.get(0), controls.get(12));
        ConnectionActions.addConnection(controls.get(11), controls.get(1));
        ConnectionActions.addConnection(controls.get(11), controls.get(2));
        ConnectionActions.addConnection(controls.get(11), controls.get(3));
        ConnectionActions.addConnection(controls.get(11), controls.get(4));
        ConnectionActions.addConnection(controls.get(11), controls.get(5));
        ConnectionActions.addConnection(controls.get(12), controls.get(6));
        ConnectionActions.addConnection(controls.get(12), controls.get(7));
        ConnectionActions.addConnection(controls.get(12), controls.get(8));
        ConnectionActions.addConnection(controls.get(12), controls.get(9));
        ConnectionActions.addConnection(controls.get(12), controls.get(10));
        ConnectionActions.addConnection(controls.get(13), controls.get(11));
        ConnectionActions.addConnection(controls.get(14), controls.get(12));
        ConnectionActions.addConnection(controls.get(13), controls.get(15));
        ConnectionActions.addConnection(controls.get(13), controls.get(16));
        ConnectionActions.addConnection(controls.get(14), controls.get(17));
        ConnectionActions.addConnection(controls.get(14), controls.get(18));
    }
});