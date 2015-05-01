import Immutable from 'immutable';
import AltApp from '../core/alt-app';
import AlarmActions from './alarm-actions'

class SettingsStore {
    constructor() {
        this.alarms = Immutable.List();
        this.bindAction(AlarmActions.triggerAlarm, this.onTriggerAlarm);

        this.on('init', this.bootstrap);
    }

    bootstrap() {
        if (! Immutable.Map.isMap(this.alarms)) {
            this.alarms = Immutable.Map(this.alarms);
        }
    }

    onSetSettings(payload) {
        payload.settings.forEach((setting, key) => {
            this.settings = this.settings.set(key, setting);
        });
    }
}

export default AltApp.createStore(SettingsStore, 'SettingsStore');
