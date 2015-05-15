import Immutable from 'immutable';
import shortId from 'shortid';
import Reflux from 'reflux';

import LoggingActions from './logging-actions';
import SettingsStore from '../settings/settings-store';
import Log from './log';

export default Reflux.createStore({
    init() {
        this.logging = Immutable.List();

        this.listenToMany(LoggingActions);
    },
    onLog(level, message) {
        const log = new Log({
            level: level,
            message: message,
            id: shortId.generate(),
            date: new Date()
        });

        this.logging = this.logging.push(log);
        this.trigger(this.logging);

        if(SettingsStore.settings.get('logToConsole')) {
            console.log(log.message);
        }
    },
    onRemoveLog(id) {
        this.logging = this.logging.filter((log) => log.id !== id);
        this.trigger(this.logging);
    },
    onFlushLogging() {
        this.logging = Immutable.List();
        this.trigger(this.logging);
    }
});