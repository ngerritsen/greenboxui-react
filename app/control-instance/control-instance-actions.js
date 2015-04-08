import AltApp from '../core/alt-app';

class ControlInstanceActions {
    constructor() {
        this.generateActions('addControl', 'renameControl', 'removeControl')
    }

    addControl(controlTypeId, name) {
        this.dispatch({
            controlTypeId: controlTypeId,
            name: name
        });
    }

    renameControl(control, newName) {
        this.dispatch({
            controlInstanceId: control.instanceId,
            newName: newName
        });
    }

    removeControl(controlInstanceId) {
        this.dispatch({
            controlInstanceId: controlInstanceId
        });
    }
}

export default AltApp.createActions(ControlInstanceActions);
