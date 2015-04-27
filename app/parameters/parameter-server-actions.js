import Immutable from 'immutable';
import AltApp from '../core/alt-app';
import Parameter from './parameter';

class ParameterServerActions {
    refreshParametersSucceeded() {
        this.dispatch({
            parameters: []
        });
    }

    refreshParametersFailed() {
        this.dispatch({
        });
    }
}

export default AltApp.createActions(ParameterServerActions);