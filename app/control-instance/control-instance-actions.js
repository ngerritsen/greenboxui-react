import AltApp from '../core/alt-app';

class ControlInstanceActions {
    addControl(controlTypeId, name) {
        this.dispatch({
            controlTypeId: controlTypeId,
            name: name
        });
    }

    renameControl(controlInstanceId, newName) {
        this.dispatch({
            controlInstanceId: controlInstanceId,
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
