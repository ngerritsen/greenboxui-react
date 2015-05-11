import React from 'react/addons';
import Immutable from 'immutable';
import shortId from 'shortid';
import AlarmStore from './alarm-store';
import AlarmActions from './alarm-actions';
import AlarmView from './alarm-view';
import Alarm from './alarm';

const ReactTestUtils = React.addons.TestUtils;

describe('alarm view', () => {
    const dummyAlarmA = new Alarm({id: shortId.generate(), date: new Date(), message: 'Dummy alarm A'});
    const dummyAlarmB = new Alarm({id: shortId.generate(), date: new Date(), message: 'Dummy alarm B'});

    let alarmView;

    beforeEach(() => {
        AlarmStore.alarms = Immutable.List.of(dummyAlarmA, dummyAlarmB);
        alarmView = ReactTestUtils.renderIntoDocument(
            <AlarmView/>
        );
    });

    afterEach(() => {
        alarmView.componentWillUnmount();
        React.unmountComponentAtNode(document.body);
    });

    it('gets initial state from alarm store', () => {
        expect(alarmView.state.alarms.count()).toEqual(2);
        expect(alarmView.state.alarms.get(0)).toEqual(dummyAlarmA);
    });

    it('handles alarm resets', () => {
        spyOn(AlarmActions, 'resetAlarm');

        alarmView._handleResetAlarm(dummyAlarmA);

        expect(AlarmActions.resetAlarm).toHaveBeenCalledWith(dummyAlarmA.id);
    });

});