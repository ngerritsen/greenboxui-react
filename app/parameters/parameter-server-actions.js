import Immutable from 'immutable';
import AltApp from '../core/alt-app';
import shortId from 'shortid';
import Parameter from './parameter';
import UserLevels from '../shared/user-levels';
import ParameterAccessLevels from '../parameters/parameter-access-levels';

class ParameterServerActions {
    refreshParametersSucceeded(parameters) {
        this.dispatch({
            parameters: processDummyParams(parameters)
        });
    }

    refreshParametersFailed() {
        this.dispatch({});
    }
}

function processDummyParams(parameters) {
    return parameters.map((parameter) => {
        parameter = parameter.set('unit', 'l/m');
        parameter = parameter.set('name', 'Unknown');

        if(parameter.parameterId === 'measurement') {
            parameter.set('name', 'Measurement');
        }
        else if(parameter.parameterId === 'setpoint') {
            parameter = parameter.set('name', 'Setpoint');
            parameter = parameter.set(UserLevels.user, ParameterAccessLevels.fullAccess);
            parameter = parameter.set(UserLevels.service, ParameterAccessLevels.fullAccess);
            parameter = parameter.set(UserLevels.developer, ParameterAccessLevels.fullAccess);
        }
        else if(parameter.parameterId === 'ioValue') {
            parameter = parameter.set('name', 'IO Value');
            parameter = parameter.set(UserLevels.user, ParameterAccessLevels.hidden);
            parameter = parameter.set(UserLevels.developer, ParameterAccessLevels.fullAccess);
        }
        else if(parameter.parameterId === 'pBand') {
            parameter = parameter.set('name', 'P-Band');
            parameter = parameter.set('unit', '%');
            parameter = parameter.set(UserLevels.service, ParameterAccessLevels.fullAccess);
            parameter = parameter.set(UserLevels.developer, ParameterAccessLevels.fullAccess);
        }
        parameter = parameter.set('isSet', true);
        return parameter.set('value', (Math.round(Math.random()*100))/10);
    });
}

export default AltApp.createActions(ParameterServerActions);