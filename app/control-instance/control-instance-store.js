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

    onControlAdded(control) {
        if(control.typeId && control.name) {
            control.instanceId = this.getNewInstanceId();
            this.controls.push(control);
        }
    }

    onControlRemoved(payload){
        if(payload.instanceId) {
            const instanceId = payload.instanceId;
            this.controls = this.controls.filter((control) => control.instanceId !== instanceId);
        }
    }

    getNewInstanceId() {
        return Math.round((Math.random() * 1000000))
    }
}

export default AltApp.createStore(ControlInstanceStore);
