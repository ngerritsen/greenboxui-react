import Immutable from 'immutable';
import shortId from 'shortid';
import AltApp from '../core/alt-app';

class AlarmServerActions {
    resetAlarmSucceeded(dirtyId) {
        this.dispatch({
            clean: dirtyId
        });
    }

    resetAlarmFailed(dirtyId) {
        this.dispatch({
            clean: dirtyId
        });
    }
}

export default AltApp.createActions(AlarmServerActions);