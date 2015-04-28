import Immutable from 'immutable';
import AltApp from '../core/alt-app';
import Parameter from './parameter';
import ParameterServerActions from './parameter-server-actions';
import ParameterApiCalls from './parameter-api-calls';

class ParameterActions {
    refreshParameters(parameters) {
        const request = ParameterApiCalls.getParameters(parameters);
        request.then(() => ParameterServerActions.refreshParametersSucceeded(parameters));
        request.catch(() => ParameterServerActions.refreshParametersFailed());
    }

    registerParameter(controlInstanceId, parameterId) {
        this.dispatch({
            controlInstanceId: controlInstanceId,
            parameterId: parameterId
        });
    }

    unregisterParameter(controlInstanceId, parameterId) {
        this.dispatch({
            controlInstanceId: controlInstanceId,
            parameterId: parameterId
        });
    }
}

export default AltApp.createActions(ParameterActions);