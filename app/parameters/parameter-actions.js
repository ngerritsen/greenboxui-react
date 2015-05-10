import Immutable from 'immutable';
import shortId from 'shortid';
import Reflux from 'reflux';
import Parameter from './parameter';
import ParameterServerActions from './parameter-server-actions';
import ParameterApiCalls from './parameter-api-calls';

let ParameterActions = Reflux.createActions({
    'refreshParameters': {children: ['completed', 'failed']},
    'registerParameter': {},
    'unregisterParameter': {},
    'setParameter': {children: ['completed', 'failed']}
});

ParameterActions.refreshParameters.listen((parameters) => {
    let request = ParameterApiCalls.getParameters(parameters);
    request.then(() => this.completed(parameters));
    request.catch(() => this.failed(parameters));
});

ParameterActions.setParameter.listen((controlInstanceId, parameterId, newValue, oldValue) => {
    const dirty = shortId.generate();

    let request = ParameterApiCalls.postParameterValue(controlInstanceId, parameterId, newValue);
    request.then(() => ParameterServerActions.setParameterSucceeded(newValue, dirty));
    request.catch(() => ParameterServerActions.setParameterFailed(oldValue, dirty));
});

export default ParameterActions;