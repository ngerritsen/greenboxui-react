import Immutable from 'immutable';
import shortId from 'shortid';
import AltApp from '../core/alt-app';

class AlarmActions {
    raiseAlarm(message) {
        this.dispatch({
            date: new Date(),
            id: shortId.generate(),
            message: message
        });
    }

    resetAlarm(id) {
        this.dispatch({
            id: id
        });
    }
}

export default AltApp.createActions(AlarmActions);