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

    setParameterSucceeded(dirtyId) {
        this.dispatch({
            clean: dirtyId
        });
    }

    setParameterFailed(oldValue, dirtyId) {
        this.dispatch({
            oldValue: oldValue,
            clean: dirtyId
        });
    }
}

function processDummyParams(parameters) {
    return parameters.map((parameter) => {
        parameter = parameter
            .set('unit', 'l/m')
            .set('name', 'Unknown')
            .set('isSet', true)
            .set('value', (Math.round(Math.random()*100))/10);

        if(parameter.parameterId === 'measurement') {
            parameter = parameter.set('name', 'Measurement');
        }
        else if(parameter.parameterId === 'setpoint') {
            parameter = parameter
                .set('name', 'Setpoint')
                .set(UserLevels.user, ParameterAccessLevels.fullAccess)
                .set(UserLevels.service, ParameterAccessLevels.fullAccess)
                .set(UserLevels.developer, ParameterAccessLevels.fullAccess);
        }
        else if(parameter.parameterId === 'ioValue') {
            parameter = parameter
                .set('name', 'IO Value')
                .set(UserLevels.user, ParameterAccessLevels.hidden)
                .set(UserLevels.developer, ParameterAccessLevels.fullAccess);
        }
        else if(parameter.parameterId === 'pBand') {
            parameter = parameter
                .set('name', 'P-Band')
                .set('unit', '%')
                .set(UserLevels.service, ParameterAccessLevels.fullAccess)
                .set(UserLevels.developer, ParameterAccessLevels.fullAccess);
        }

        return parameter
    });
}

export default AltApp.createActions(ParameterServerActions);