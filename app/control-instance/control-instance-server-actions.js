import AltApp from '../core/alt-app';

class ControlInstanceServerActions {
    addControlSucceeded(dirtyId, control) {
        this.dispatch({
            typeId: control.typeId,
            name: control.name,
            instanceId: control.instanceId,
            clean: dirtyId
        });
    }

    addControlFailed(dirtyId) {
        this.dispatch({
            clean: dirtyId
        });
    }

    renameControlSucceeded(dirtyId, newName) {
        this.dispatch({
            newName: newName,
            clean: dirtyId
        });
    }

    renameControlFailed(dirtyId, oldName) {
        this.dispatch({
            oldName: oldName,
            clean: dirtyId
        });
    }

    removeControlSucceeded(dirtyId) {
        this.dispatch({
            clean: dirtyId
        });
    }

    removeControlFailed(dirtyId) {
        this.dispatch({
            clean: dirtyId
        });
    }
}

export default AltApp.createActions(ControlInstanceServerActions);
