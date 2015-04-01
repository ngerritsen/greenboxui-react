import AltApplication from '../core/alt-application';

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

    removeControl(control) {
        this.dispatch({
            controlInstanceId: control.instanceId
        });
    }
}

export default AltApplication.createActions(ControlInstanceActions);
