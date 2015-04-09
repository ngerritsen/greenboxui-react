import AltApp from '../core/alt-app';

class ControlInstanceActions {
    addControl(typeId, name) {
        this.dispatch({
            typeId: typeId,
            name: name
        });
    }

    renameControl(instanceId, newName) {
        this.dispatch({
            instanceId: instanceId,
            newName: newName
        });
    }

    removeControl(instanceId) {
        this.dispatch({
            instanceId: instanceId
        });
    }
}

export default AltApp.createActions(ControlInstanceActions);
