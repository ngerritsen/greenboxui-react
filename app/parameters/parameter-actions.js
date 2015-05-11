import Immutable from 'immutable';
import shortId from 'shortid';
import Reflux from 'reflux';
import Parameter from './parameter';
import ParameterApiCalls from './parameter-api-calls';

let ParameterActions = Reflux.createActions({
    'refreshParameters': {children: ['completed', 'failed']},
    'registerParameter': {},
    'unregisterParameter': {},
    'setParameter': {children: ['optimistic', 'completed', 'failed']}
});

ParameterActions.refreshParameters.listen((parameters) => {
    let request = ParameterApiCalls.getParameters(parameters);
    request.then(() => this.completed(parameters));
    request.catch(() => this.failed(parameters));
});

ParameterActions.setParameter.listen((controlInstanceId, parameterId, newValue, oldValue) => {
    const dirty = shortId.generate();

    this.optimistic(controlInstanceId, parameterId, newValue, dirty);

    let request = ParameterApiCalls.postParameterValue(controlInstanceId, parameterId, newValue);
    request.then(() => this.completed(dirty));
    request.catch(() => this.failed(oldValue, dirty));
});

export default ParameterActions;