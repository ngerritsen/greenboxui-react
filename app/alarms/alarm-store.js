import Immutable from 'immutable';
import AltApp from '../core/alt-app';
import AlarmActions from './alarm-actions'
import Alarm from './alarm';

class AlarmStore {
    constructor() {
        this.alarms = Immutable.List();
        this.bindAction(AlarmActions.raiseAlarm, this.onRaiseAlarm);
        this.bindAction(AlarmActions.resetAlarm, this.onResetAlarm);

        this.on('init', this.bootstrap);
    }

    bootstrap() {
        if (! Immutable.List.isList(this.alarms)) {
            this.alarms = Immutable.List(this.alarms);
        }
    }

    onRaiseAlarm(payload) {
        const {message, id, date} = payload;
        this.alarms = this.alarms.push(new Alarm({
            id: id,
            message: message,
            date: date
        }));
    }

    onResetAlarm(payload) {
        const {id} = payload;
        this.alarms = this.alarms.filter((alarm) => alarm.id !== id);
    }
}

export default AltApp.createStore(AlarmStore, 'AlarmStore');
