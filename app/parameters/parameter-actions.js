import Immutable from 'immutable';
import shortId from 'shortid';
import AltApp from '../core/alt-app';
import Parameter from './parameter';
import ParameterServerActions from './parameter-server-actions';
import ParameterApiCalls from './parameter-api-calls';

class ParameterActions {
    refreshParameters(parameters) {
        let request = ParameterApiCalls.getParameters(parameters);
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

    setParameter(controlInstanceId, parameterId, newValue, oldValue) {
        const dirtyId = shortId.generate();

        let request = ParameterApiCalls.postParameterValue(controlInstanceId, parameterId, newValue);
        request.then(() => ParameterServerActions.setParameterSucceeded(dirtyId, newValue));
        request.catch(() => ParameterServerActions.setParameterFailed(dirtyId, oldValue));

        this.dispatch({
            controlInstanceId: controlInstanceId,
            parameterId: parameterId,
            newValue: newValue
        });
    }
}

export default AltApp.createActions(ParameterActions);