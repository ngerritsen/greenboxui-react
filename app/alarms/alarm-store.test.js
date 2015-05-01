import shortId from 'shortid';
import AltApp from '../core/alt-app';
import AlarmStore from './alarm-store';
import AlarmActions from './alarm-actions';
import Alarm from './alarm';

describe('alarm store', () => {
    const alarmMsgA = 'alarm msg a';
    const alarmMsgB = 'alarm msg b';

    const alarmIdA = shortId.generate();
    const alarmIdB = shortId.generate();

    afterEach(() => AltApp.flush());

    it('raises an alarm', () => {
        raiseAlarm(alarmMsgA, alarmIdA);

        expect(AlarmStore.getState().alarms.count()).toEqual(1);
        expect(AlarmStore.getState().alarms.get(0).id).toEqual(alarmIdA);
        expect(AlarmStore.getState().alarms.get(0).message).toEqual(alarmMsgA);
    });

    it('raises multiple alarms', () => {
        raiseAlarm(alarmMsgA, alarmIdA);
        raiseAlarm(alarmMsgB, alarmIdB);

        expect(AlarmStore.getState().alarms.count()).toEqual(2);
    });

    it('resets an alarm', () => {
        raiseAlarm(alarmMsgA, alarmIdA);
        resetAlarm(alarmIdA);

        expect(AlarmStore.getState().alarms.count()).toEqual(0);
    });

    function raiseAlarm(message, id) {
        AltApp.dispatcher.dispatch({
            action: AlarmActions.RAISE_ALARM,
            data: {
                id: id,
                date: new Date(),
                message: message
            }
        });
    }

    function resetAlarm(id) {
        AltApp.dispatcher.dispatch({
            action: AlarmActions.RESET_ALARM,
            data: {
                id: id
            }
        });
    }
});