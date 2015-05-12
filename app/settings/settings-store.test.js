import Immutable from 'immutable';

import SettingsStore from './settings-store';
import SettingsActions from './settings-actions'

describe('settings store', () => {

    const settingA1 = 1;
    const settingB1 = 'setting';

    const settingA2 = 3;
    const settingB2 = 'gnittes';

    beforeEach(() => {
        SettingsStore.settings = Immutable.Map();
        jasmine.clock().install();
    });

    afterEach(() => {
        SettingsStore.settings = Immutable.Map();
        jasmine.clock().uninstall()
    });

    it('sets settings', () => {
        setSettings(Immutable.Map({
            settingA: settingA1,
            settingB: settingB1
        }));

        expect(SettingsStore.settings.get('settingA')).toEqual(settingA1);
        expect(SettingsStore.settings.get('settingB')).toEqual(settingB1);
    });

    it('overwrites existing settings', () => {
        setSettings(Immutable.Map({
            settingA: settingA1,
            settingB: settingB1
        }));

        setSettings(Immutable.Map({
            settingA: settingA2,
            settingB: settingB2
        }));

        expect(SettingsStore.settings.get('settingA')).toEqual(settingA2);
        expect(SettingsStore.settings.get('settingB')).toEqual(settingB2);
    });

    function setSettings(settings) {
        SettingsActions.setSettings(settings);
        jasmine.clock().tick(jasmine.DEFAULT_TIMEOUT_INTERVAL);
    }
});
