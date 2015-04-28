import Immutable from 'immutable';
import AltApp from '../core/alt-app';
import shortId from 'shortid';
import Parameter from './parameter';

class ParameterServerActions {
    refreshParametersSucceeded() {
        this.dispatch({
        });
    }

    refreshParametersFailed() {
        this.dispatch({
        });
    }
}

export default AltApp.createActions(ParameterServerActions);