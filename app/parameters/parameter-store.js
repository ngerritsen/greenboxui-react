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

        this.bindAction(ParameterActions.registerParameter, this.onRegisterParameter);
        this.bindAction(ParameterActions.unregisterParameter, this.onUnregisterParameter);

        this.bindAction(ParameterActions.setParameter, this.onSetParameterOptimistic);
        this.bindAction(ParameterServerActions.setParameterSucceeded, this.onSetParameterSucceeded);
        this.bindAction(ParameterServerActions.setParameterFailed, this.onSetParameterFailed);

        this.on('init', this.bootstrap);

        setInterval(() => this.parameters.count() ? ParameterActions.refreshParameters(this.parameters) : false , 3500);
    }

    bootstrap() {
        if (! Immutable.List.isList(this.parameters)) {
            this.parameters = Immutable.List(this.parameters);
        }
    }

    onRegisterParameter(payload) {
        const {parameterId, controlInstanceId} = payload;
        if(!this.parameters.find((param) => parameterId === param.parameterId && controlInstanceId === param.controlInstanceId)) {
            this.parameters = this.parameters.push(new Parameter({
                parameterId: parameterId,
                controlInstanceId: controlInstanceId
            }));
        }
    }

    onUnregisterParameter(payload) {
        const {parameterId, controlInstanceId} = payload;
        this.parameters = this.parameters.filter((param) => {
            return !(parameterId === param.parameterId && controlInstanceId === param.controlInstanceId)
        });
    }

    onRefreshParametersSucceeded(payload) {
        this.parameters = Immutable.List(payload.parameters);
    }

    onSetParameterOptimistic(payload) {
        const {parameterId, controlInstanceId, newValue, dirty} = payload;
        this.parameters = this.parameters.map((param) => {
            if(parameterId === param.parameterId && controlInstanceId === param.controlInstanceId) {
                param = param
                    .set('value', newValue)
                    .set('dirty', dirty);
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
                param = param
                    .set('value', oldValue)
                    .remove('dirty');
            }
            return param;
        });
    }
}

export default AltApp.createStore(ParameterStore, 'ParameterStore');
