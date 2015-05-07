import Immutable from 'immutable';
import AltApp from '../core/alt-app';
import shortId from 'shortid';

class LoggingActions {
    log(level, message) {
        this.dispatch({
            level: level,
            message: message,
            id: shortId.generate()
        });
    }
}

export default AltApp.createActions(LoggingActions);