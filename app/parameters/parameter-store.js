import Immutable from 'immutable';
import shortId from 'shortid';
import Reflux from 'reflux';
import Parameter from './parameter';
import ParameterActions from './parameter-actions';

export default Reflux.createStore({
    init() {
        this.parameters = Immutable.List();

        this.listenToMany(ParameterActions);

        setInterval(() => this.parameters.count() ? ParameterActions.refreshParameters(this.parameters) : false , 3500);
    },
    onRegisterParameter(controlInstanceId, parameterId) {
        if(!this.parameters.find((param) => parameterId === param.parameterId && controlInstanceId === param.controlInstanceId)) {
            this.parameters = this.parameters.push(new Parameter({
                parameterId: parameterId,
                controlInstanceId: controlInstanceId
            }));
        }
    },
    onUnregisterParameter(controlInstanceId, parameterId) {
        this.parameters = this.parameters.filter((param) => {
            return !(parameterId === param.parameterId && controlInstanceId === param.controlInstanceId)
        });
    },
    onRefreshParametersCompleted(parameters) {
        this.parameters = Immutable.List(parameters);
    },
    onSetParameterOptimistic(controlInstanceId, parameterId, newValue, dirty) {
        this.parameters = this.parameters.map((param) => {
            if(parameterId === param.parameterId && controlInstanceId === param.controlInstanceId) {
                param = param
                    .set('value', newValue)
                    .set('dirty', dirty);
            }
            return param;
        });
    },
    onSetParameterCompleted(dirty) {
        this.parameters = this.parameters.map((param) => {
            if(param.dirty === dirty) {
                param = param.remove('dirty');
            }
            return param;
        });
    },
    onSetParameterFailed(oldValue, dirty) {
        this.parameters = this.parameters.map((param) => {
            if(param.dirty === dirty) {
                param = param
                    .set('value', oldValue)
                    .remove('dirty');
            }
            return param;
        });
    }
});
