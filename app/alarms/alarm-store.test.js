import Immutable from 'immutable';
import shortId from 'shortid';

import Alarm from './alarm';
import AlarmStore from './alarm-store';
import AlarmActions from './alarm-actions';

describe('alarm store', () => {
    const alarmMsgA = 'alarm msg a';
    const alarmMsgB = 'alarm msg b';

    const dirtyA = shortId.generate();

    const alarmIdA = shortId.generate();
    const alarmIdB = shortId.generate();

    beforeEach(() => {
        AlarmStore.alarms = Immutable.List();
        jasmine.clock().install()
    });

    afterEach(() => {
        AlarmStore.alarms = Immutable.List();
        jasmine.clock().uninstall()
    });

    it('raises an alarm', () => {
        raiseAlarm(alarmMsgA, alarmIdA);

        expect(AlarmStore.alarms.count()).toEqual(1);
        expect(AlarmStore.alarms.get(0).id).toEqual(alarmIdA);
        expect(AlarmStore.alarms.get(0).message).toEqual(alarmMsgA);
    });

    it('raises multiple alarms', () => {
        raiseAlarm(alarmMsgA, alarmIdA);
        raiseAlarm(alarmMsgB, alarmIdB);

        expect(AlarmStore.alarms.count()).toEqual(2);
    });

    it('resets an alarm optimistically', () => {
        raiseAlarm(alarmMsgA, alarmIdA);
        resetAlarmOptimistic(alarmIdA, dirtyA);

        expect(AlarmStore.alarms.get(0).dirty).toEqual(dirtyA);
    });

    it('resets an alarm actually on success', () => {
        raiseAlarm(alarmMsgA, alarmIdA);
        resetAlarmOptimistic(alarmIdA, dirtyA);
        resetAlarmCompleted(dirtyA);

        expect(AlarmStore.alarms.count()).toEqual(0);
    });

    it('does not reset an alarm actually on failure', () => {
        raiseAlarm(alarmMsgA, alarmIdA);
        resetAlarmOptimistic(alarmIdA, dirtyA);
        resetAlarmFailed(dirtyA);

        expect(AlarmStore.alarms.count()).toEqual(1);
        expect(AlarmStore.alarms.get(0).dirty).toBeFalsy();
    });

    function raiseAlarm(message, id) {
        AlarmActions.raiseAlarm(id, new Date(), message);
        jasmine.clock().tick(jasmine.DEFAULT_TIMEOUT_INTERVAL);
    }

    function resetAlarmOptimistic(id, dirty) {
        AlarmActions.resetAlarm.optimistic(id, dirty);
        jasmine.clock().tick(jasmine.DEFAULT_TIMEOUT_INTERVAL);
    }

    function resetAlarmCompleted(dirty) {
        AlarmActions.resetAlarm.completed(dirty);
        jasmine.clock().tick(jasmine.DEFAULT_TIMEOUT_INTERVAL);
    }

    function resetAlarmFailed(dirty) {
        AlarmActions.resetAlarm.failed(dirty);
        jasmine.clock().tick(jasmine.DEFAULT_TIMEOUT_INTERVAL);
    }
});