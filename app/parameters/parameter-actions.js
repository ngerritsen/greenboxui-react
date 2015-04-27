import Immutable from 'immutable';
import AltApp from '../core/alt-app';
import Parameter from './parameter';
import ParameterApiCalls from './parameter-api-calls';

class ParameterActions {
    refreshParameters() {
        this.dispatch({

        });
    }
}

export default AltApp.createActions(ParameterActions);