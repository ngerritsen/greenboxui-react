import Immutable from 'immutable';
import shortId from 'shortid';
import Reflux from 'reflux';
import Parameter from './parameter';
import ParameterApiCalls from './parameter-api-calls';
import ParameterAccessLevels from './parameter-access-levels';
import UserLevels from '../shared/user-levels';

let ParameterActions = Reflux.createActions({
    'refreshParameters': {children: ['completed', 'failed']},
    'registerParameter': {},
    'unregisterParameter': {},
    'setParameter': {children: ['optimistic', 'completed', 'failed']}
});

ParameterActions.refreshParameters.listen(onRefreshParameters);
ParameterActions.setParameter.listen(onSetParameter);

function onRefreshParameters(parameters) {
    ParameterApiCalls.getParameters(parameters)
        .then(() => this.completed(generateDummyParams(parameters)))
        .catch(() => this.failed(generateDummyParams(parameters)));
}

function onSetParameter(controlInstanceId, parameterId, newValue, oldValue) {
    const dirty = shortId.generate();

    this.optimistic(controlInstanceId, parameterId, newValue, dirty);

    ParameterApiCalls.postParameterValue(controlInstanceId, parameterId, newValue)
        .then(() => this.completed(dirty))
        .catch(() => this.failed(oldValue, dirty));
}

export default ParameterActions;

function generateDummyParams(parameters) {
    return parameters.map((param) => {
        if(param.parameterId === 'measurement') {
            param = param
                .set('name', 'Measurement')
                .set('unit', 'l/m');
        }
        else if(param.parameterId === 'setpoint') {
            param = param
                .set('name', 'Setpoint')
                .set('unit', 'l/m');
        }
        else if(param.parameterId === 'pBand') {
            param = param
                .set('name', 'P-Band')
                .set('unit', '%');
        }
        else if(param.parameterId === 'ioValue') {
            param = param
                .set('name', 'I/O Value')
                .set('unit', 'l/m');
        }
        param = param.set('value', Math.round((Math.random()*1000)/100));
        return param;
    });
}
