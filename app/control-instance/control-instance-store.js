import AltApp from '../core/alt-app';
import ControlInstanceActions from './control-instance-actions';

class ControlInstanceStore {
    constructor() {
        this.controls = [];

        this.bindAction(ControlInstanceActions.addControl, this.onControlAdded)
    }

    onControlAdded(payload){
        if(payload.controlTypeId && payload.name) {
            const {controlTypeId, name} = payload;
            this.controls.push({
                controlTypeId: controlTypeId,
                name: name
            });
        }
    }
}

export default AltApp.createStore(ControlInstanceStore);
