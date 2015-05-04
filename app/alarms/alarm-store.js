import Immutable from 'immutable';
import AltApp from '../core/alt-app';
import AlarmActions from './alarm-actions'
import AlarmServerActions from './alarm-server-actions'
import Alarm from './alarm';

class AlarmStore {
    constructor() {
        this.alarms = Immutable.List();
        this.bindAction(AlarmActions.raiseAlarm, this.onRaiseAlarm);
        this.bindAction(AlarmActions.resetAlarm, this.onResetAlarmOptimistic);
        this.bindAction(AlarmServerActions.resetAlarmSucceeded, this.onResetAlarmSucceeded);
        this.bindAction(AlarmServerActions.resetAlarmFailed, this.onResetAlarmFailed);

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

    onResetAlarmOptimistic(payload) {
        const {id, dirty} = payload;
        this.alarms = this.alarms.map((alarm) => {
            if(alarm.id === id) {
                alarm.set('dirty', dirty);
            }
            return alarm;
        });
    }

    onResetAlarmSucceeded(payload) {
        const {clean} = payload;
        this.alarms = this.alarms.filter((alarm) => alarm.dirty !== clean);
    }

    onResetAlarmFailed(payload) {
        const {clean} = payload;
        this.alarms = this.alarms.map((alarm) => {
            if(alarm.dirty === clean) {
                alarm.remove('dirty');
            }
            return alarm;
        });
    }
}

export default AltApp.createStore(AlarmStore, 'AlarmStore');
