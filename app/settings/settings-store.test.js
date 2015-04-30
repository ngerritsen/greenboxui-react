import Immutable from 'immutable';
import AltApp from '../core/alt-app';
import SettingsStore from './settings-store';
import SettingsActions from './settings-actions'

describe('settings store', () => {

    const settingA1 = 1;
    const settingB1 = 'setting';

    const settingA2 = 3;
    const settingB2 = 'gnittes';

    afterEach(() => AltApp.flush());

    it('sets settings', () => {
        setSettings(Immutable.Map({
            settingA: settingA1,
            settingB: settingB1
        }));

        expect(SettingsStore.getState().settings.get('settingA')).toEqual(settingA1);
        expect(SettingsStore.getState().settings.get('settingB')).toEqual(settingB1);
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

        expect(SettingsStore.getState().settings.get('settingA')).toEqual(settingA2);
        expect(SettingsStore.getState().settings.get('settingB')).toEqual(settingB2);
    });

    function setSettings(settings) {
        AltApp.dispatcher.dispatch({
            action: SettingsActions.SET_SETTINGS,
            data: { settings: settings }
        })
    }
});
