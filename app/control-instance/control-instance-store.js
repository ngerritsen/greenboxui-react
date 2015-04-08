import AltApp from '../core/alt-app';
import ControlInstanceActions from './control-instance-actions';

class ControlInstanceStore {
    constructor() {
        this.controls = [];

        this.bindAction(ControlInstanceActions.addControl, this.onControlAdded);
        this.bindAction(ControlInstanceActions.removeControl, this.onControlRemoved);

        this.exportPublicMethods({
            getNewInstanceId: this.getNewInstanceId
        });
    }

    onControlAdded(payload){
        if(payload.controlTypeId && payload.name) {
            const {controlTypeId, name} = payload;
            this.controls.push({
                controlTypeId: controlTypeId,
                controlInstanceId: this.getNewInstanceId(),
                name: name
            });
        }
    }

    onControlRemoved(payload){
        if(payload.controlInstanceId) {
            const controlInstanceId = payload.controlInstanceId;
            this.controls = this.controls.filter((control) => control.controlInstanceId !== controlInstanceId);
        }
    }

    getNewInstanceId() {
        return Math.round((Math.random() * 1000000))
    }
}

export default AltApp.createStore(ControlInstanceStore);
