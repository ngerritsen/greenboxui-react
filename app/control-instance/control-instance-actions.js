import AltApp from '../core/alt-app';
import BlueBirdPromise from 'bluebird';
import ControlInstanceServerActions from './control-instance-server-actions';

class ControlInstanceActions {
    addControl(typeId, name) {
        const dirtyId = _getNewRandomId();
        const controlFromServer = {
            typeId: typeId,
            name: name,
            instanceId: _getNewRandomId()
        };
        let request = new BlueBirdPromise((resolve, reject) => {
            setTimeout(() => resolve(), 1000);
        });
        request.then(() => ControlInstanceServerActions.addControlSucceeded(dirtyId, controlFromServer));
        this.dispatch({
            typeId: typeId,
            name: name,
            dirty: dirtyId
        });
    }

    renameControl(instanceId, newName) {
        const dirtyId = _getNewRandomId();
        let request = new BlueBirdPromise((resolve, reject) => {
            setTimeout(() => resolve(), 1000);
        });
        request.then(() => ControlInstanceServerActions.renameControlSucceeded(dirtyId, newName));
        this.dispatch({
            instanceId: instanceId,
            newName: newName,
            dirty: dirtyId
        });
    }

    removeControl(instanceId) {
        this.dispatch({
            instanceId: instanceId
        });
    }
}

function _getNewRandomId() {
    return Math.round((Math.random() * 1000000))
}

export default AltApp.createActions(ControlInstanceActions);
