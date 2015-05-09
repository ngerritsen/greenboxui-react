import Immutable from 'immutable';
import Reflux from 'reflux';
import shortId from 'shortid';
import LoggingActions from './logging-actions';
import SettingsStore from '../settings/settings-store';
import Log from './log';

export default Reflux.createStore({
    init() {
        this.logging = Immutable.List();

        this.listenToMany(LoggingActions);
    },
    onLog(level, message) {
        let log = new Log({
            level: level,
            message: message,
            id: shortId.generate(),
            date: new Date()
        });

        this.logging = this.logging.push(log);

        if(SettingsStore.getSetting('logToConsole')) {
            console.log(log.message);
        }
    }
});