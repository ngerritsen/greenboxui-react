import Immutable from 'immutable';
import AltApp from '../core/alt-app';
import shortId from 'shortid';
import Parameter from './parameter';

class ParameterServerActions {
    refreshParametersSucceeded(parameters) {
        this.dispatch({
            parameters: parameters.map((parameter) => {
                parameter = parameter.set('name', 'Unknown');
                parameter = parameter.set('unit', 'm/s');
                return parameter.set('value', (Math.round(Math.random()*100))/10);
            })
        });
    }

    refreshParametersFailed() {
        this.dispatch({
        });
    }
}

export default AltApp.createActions(ParameterServerActions);