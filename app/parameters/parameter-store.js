import Immutable from 'immutable';
import AltApp from '../core/alt-app';
import Parameter from './parameter';

class ParameterStore {
    constructor() {
        this.parameters = Immutable.List();

        this.on('init', this.bootstrap);
    }

    bootstrap() {
        if (! this.Immutable.List.isList(this.parameters)) {
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
            return!(parameterId === param.parameterId && controlInstanceId === param.controlInstanceId)
        });
    }
}

export default AltApp.createStore(ParameterStore, 'ParameterStore');
