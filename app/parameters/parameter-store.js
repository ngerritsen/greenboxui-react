import Immutable from 'immutable';
import shortId from 'shortid';
import AltApp from '../core/alt-app';
import Parameter from './parameter';
import ParameterActions from './parameter-actions';
import ParameterServerActions from './parameter-server-actions';

class ParameterStore {
    constructor() {
        this.parameters = Immutable.List();

        this.bindAction(ParameterServerActions.refreshParametersSucceeded, this.onRefreshParametersSucceeded);

        this.bindAction(ParameterActions.registerParameter, this.registerParameter);
        this.bindAction(ParameterActions.unregisterParameter, this.unregisterParameter);

        this.on('init', this.bootstrap);

        ParameterActions.refreshParameters(this.parameters);
    }

    bootstrap() {
        if (! Immutable.List.isList(this.parameters)) {
            this.parameters = Immutable.List(this.parameters);
        }
    }

    registerParameter(payload) {
        const {parameterId, controlInstanceId} = payload;
        if(!this.parameters.find((param) => parameterId === param.parameterId && controlInstanceId === param.controlInstanceId)) {
            this.parameters = this.parameters.push(new Parameter({
                parameterId: parameterId,
                controlInstanceId: controlInstanceId
            }));
        }
    }

    unregisterParameter(payload) {
        const {parameterId, controlInstanceId} = payload;
        this.parameters = this.parameters.filter((param) => {
            return !(parameterId === param.parameterId && controlInstanceId === param.controlInstanceId)
        });
    }

    onRefreshParametersSucceeded(payload) {
        this.parameters = Immutable.List(payload.parameters).map((param) => {
            return new Parameter({
                parameterId: param.parameterId,
                controlInstanceId: param.controlInstanceId,
                value: param.value,
                unit: param.unit,
                name: param.name,
                isSet: true
            });
        });
    }

    optimisticallySetParameter(payload) {
        const {parameterId, controlInstanceId, value, dirty} = payload;
        this.parameters = this.parameters.map((param) => {
            if(parameterId === param.parameterId && controlInstanceId === param.controlInstanceId) {
                param = param.set('value', value);
                param = param.set('dirty', shortId.generate());
            }
            return param;
        });
    }

    onSetParameterSucceeded(payload) {
        const {clean} = payload;
        this.parameters = this.parameters.map((param) => {
            if(param.dirty === clean) {
                param = param.remove('dirty');
            }
            return param;
        });
    }

    onSetParameterFailed(payload) {
        const {oldValue, clean} = payload;
        this.parameters = this.parameters.map((param) => {
            if(param.dirty === clean) {
                param = param.set('value', oldValue);
                param = param.remove('dirty');
            }
            return param;
        });
    }
}

export default AltApp.createStore(ParameterStore, 'ParameterStore');
