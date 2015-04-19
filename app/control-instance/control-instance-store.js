import AltApp from '../core/alt-app';
import ControlInstanceActions from './control-instance-actions';

class ControlInstanceStore {
    constructor() {
        this.controls = [];

        this.bindAction(ControlInstanceActions.addControl, this.onControlAdded);
        this.bindAction(ControlInstanceActions.removeControl, this.onControlRemoved);
        this.bindAction(ControlInstanceActions.renameControl, this.onControlRenamed);

        this.exportPublicMethods({
            _getNewInstanceId: this._getNewInstanceId
        });
    }

    onControlAdded(control) {
        if(control.typeId && control.name) {
            control.instanceId = this._getNewInstanceId();
            this.controls.push(control);
        }
    }

    onControlRemoved(payload) {
        if(payload.instanceId) {
            const instanceId = payload.instanceId;
            this.controls = this.controls.filter((control) => control.instanceId !== instanceId);
        }
    }

    onControlRenamed(payload) {
        const {instanceId, newName} = payload;
        this.controls = this.controls.map((control) => {
            if(control.instanceId === instanceId) {
                control.name = newName;
            }
            return control;
        });
    }

    _getNewInstanceId() {
        return Math.round((Math.random() * 1000000))
    }
}

export default AltApp.createStore(ControlInstanceStore, 'ControlInstanceStore');
