import shortId from 'shortid';
import AltApp from '../core/alt-app';
import AlarmStore from './alarm-store';
import AlarmActions from './alarm-actions';
import AlarmServerActions from './alarm-server-actions';
import Alarm from './alarm';

describe('alarm store', () => {
    const alarmMsgA = 'alarm msg a';
    const alarmMsgB = 'alarm msg b';

    const dirtyIdA = shortId.generate();

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

    it('resets an alarm optimistically', () => {
        raiseAlarm(alarmMsgA, alarmIdA);
        resetAlarmOptimistic(alarmMsgA, dirtyIdA);

        expect(AlarmStore.getState().alarms.get(0).dirty).toEqual(dirtyIdA);
    });

    it('resets an alarm actually on success', () => {
        raiseAlarm(alarmMsgA, alarmIdA);
        resetAlarmOptimistic(alarmMsgA, dirtyIdA);
        resetAlarmSucceeded(dirtyIdA);

        expect(AlarmStore.getState().alarms.count()).toEqual(0);
    });

    it('does not reset an alarm actually on failure', () => {
        raiseAlarm(alarmMsgA, alarmIdA);
        resetAlarmOptimistic(alarmMsgA, dirtyIdA);
        resetAlarmFailed(dirtyIdA);

        expect(AlarmStore.getState().alarms.count()).toEqual(1);
        expect(AlarmStore.getState().alarms[0].dirty).toBeFalsy();
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

    function resetAlarmOptimistic(id, dirtyId) {
        AltApp.dispatcher.dispatch({
            action: AlarmActions.RESET_ALARM,
            data: {
                id: id,
                dirty: dirtyId
            }
        });
    }

    function resetAlarmSucceeded(clean) {
        AltApp.dispatcher.dispatch({
            action: AlarmServerActions.RESET_ALARM_SUCCEEDED,
            data: { clean: clean }
        });
    }

    function resetAlarmFailed(clean) {
        AltApp.dispatcher.dispatch({
            action: AlarmServerActions.RESET_ALARM_FAILED,
            data: { clean: clean }
        });
    }
});