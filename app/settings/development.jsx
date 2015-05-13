import React from 'react';
import shortId from 'shortid';
import Slab from '../shared/slab';
import Immutable from 'immutable';
import Reflux from 'reflux';

import AlarmActions from '../alarms/alarm-actions';
import ControlInstanceActions from '../control-instance/control-instance-actions';
import ControlInstanceStore from '../control-instance/control-instance-store';
import ConnectionActions from '../connections/connection-actions';
import LicenseStore from '../license/license-store';
import SettingsStore from '../settings/settings-store';
import SettingsActions from '../settings/settings-actions';
import Setting from './setting';
import SettingTypes from './setting-types';
import TranslationMixin from '../translation/translation-mixin';
import UserLevels from '../shared/user-levels';

export default React.createClass({
    mixins: [
        TranslationMixin,
        Reflux.connect(SettingsStore, 'settings')
    ],
    translations: ['user', 'service', 'developer'],
    getInitialState() {
        return { settings: SettingsStore.settings };
    },
    _handleChangeProduct(product) {
        SettingsActions.setSettings(Immutable.Map({ product: product }));
    },
    _handleChangeUserLevel(userLevel) {
        SettingsActions.setSettings(Immutable.Map({ user: userLevel }));
    },
    _handleSwitchLogToConsole(newValue) {
        SettingsActions.setSettings(Immutable.Map({ logToConsole: newValue }));
    },
    _handleRaiseAlarm() {
        AlarmActions.raiseAlarm(shortId.generate(), new Date(), 'This is a dummy alarm');
    },
    render() {
        const settings = this.state.settings;
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
                    defaultValue={settings.get('product')}
                />
                <Setting
                    label="userLevel"
                    type={SettingTypes.selection}
                    handler={this._handleChangeUserLevel}
                    options={Immutable.List.of(
                        { label: this.getTranslation('user'), value: UserLevels.user },
                        { label: this.getTranslation('service'), value: UserLevels.service },
                        { label: this.getTranslation('developer'), value: UserLevels.developer }
                    )}
                    defaultValue={settings.get('user')}
                />
                <Setting
                    label="logToConsole"
                    type={SettingTypes.onOff}
                    handler={this._handleSwitchLogToConsole}
                    defaultValue={settings.get('logToConsole')}
                />
            </Slab>
        );
    },
    _handleAddDummyConfiguration() {
        const license = LicenseStore.license;
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

        setTimeout(() => {
            const controls = ControlInstanceStore.controls;
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
        }, 2000);
    }
});