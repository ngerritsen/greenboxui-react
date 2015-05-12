import Immutable from 'immutable';
import Reflux from 'reflux';

import Alarm from './alarm';
import AlarmActions from './alarm-actions'

export default Reflux.createStore({
    init() {
        this.alarms = Immutable.List();

        this.listenToMany(AlarmActions);
    },
    onRaiseAlarm(id, date, message) {
        this.alarms = this.alarms.push(new Alarm({
            id: id,
            message: message,
            date: date
        }));
        this.trigger(this.alarms);
    },
    onResetAlarmOptimistic(id, dirty) {
        this.alarms = this.alarms.map((alarm) => {
            if(alarm.id === id) {
                alarm = alarm.set('dirty', dirty);
            }
            return alarm;
        });
        this.trigger(this.alarms);
    },
    onResetAlarmCompleted(dirty) {
        this.alarms = this.alarms.filter((alarm) => alarm.dirty !== dirty);
        this.trigger(this.alarms);
    },
    onResetAlarmFailed(dirty) {
        this.alarms = this.alarms.map((alarm) => {
            if(alarm.dirty === dirty) {
                alarm = alarm.remove('dirty');
            }
            return alarm;
        });
        this.trigger(this.alarms);
    }
})
