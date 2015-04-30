import Immutable from 'immutable';
import AltApp from '../core/alt-app';
import SettingsActions from './settings-actions'

class SettingsStore {
    constructor() {
        this.settings = Immutable.Map({
            product: 'isii'
        });
        this.bindAction(SettingsActions.setSettings, this.onSetSettings);

        this.on('init', this.bootstrap);
    }

    bootstrap() {
        if (! Immutable.Map.isMap(this.settings)) {
            this.settings = Immutable.Map(this.settings);
        }
    }

    onSetSettings(payload) {
        payload.settings.forEach((setting, key) => {
            this.settings = this.settings.set(key, setting);
        });
    }
}

export default AltApp.createStore(SettingsStore, 'SettingsStore');