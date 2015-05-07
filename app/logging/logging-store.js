import Immutable from 'immutable';
import AltApp from '../core/alt-app';
import LoggingActions from './logging-actions';
import SettingsStore from '../settings/settings-store';
import Log from './log';

class LoggingStore {
    constructor() {
        this.logging = Immutable.List();

        this.bindAction(LoggingActions.log, this.onLog);

        this.on('init', this.bootstrap);
    }

    bootstrap() {
        if (! Immutable.List.isList(this.logging)) {
            this.logging = Immutable.List(this.logging);
        }
    }

    onLog(payload) {
        let log = new Log(payload);
        log = log.set('date', new Date());
        this.logging = this.logging.push(log);

        if(SettingsStore.getSetting('logToConsole')) {
            console.log(log.message);
        }
    }
}

export default AltApp.createStore(LoggingStore, 'LoggingStore');