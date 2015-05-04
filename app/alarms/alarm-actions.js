import Immutable from 'immutable';
import shortId from 'shortid';
import AltApp from '../core/alt-app';
import AlarmApiCalls from './alarm-api-calls';
import AlarmServerActions from './alarm-server-actions';

class AlarmActions {
    raiseAlarm(message) {
        this.dispatch({
            date: new Date(),
            id: shortId.generate(),
            message: message
        });
    }

    resetAlarm(id) {
        const dirtyId = shortId.generate();

        AlarmApiCalls.postResetAlarm()
            .then(() => AlarmServerActions.resetAlarmSucceeded(dirtyId))
            .catch(() => AlarmServerActions.resetAlarmFailed(dirtyId));

        this.dispatch({
            id: id,
            dirty: dirtyId
        });
    }
}

export default AltApp.createActions(AlarmActions);