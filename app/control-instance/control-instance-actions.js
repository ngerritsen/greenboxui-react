import AltApp from '../core/alt-app';
import BlueBirdPromise from 'bluebird';
import shortId from 'shortid';
import ControlInstanceServerActions from './control-instance-server-actions';
import ControlInstanceApiCalls from './control-instance-api-calls';
import LicenseActions from '../license/license-actions';

class ControlInstanceActions {
    addControl(typeId, name) {
        const dirtyId = shortId.generate();
        const dummyControlFromServer = {
            typeId: typeId,
            name: name,
            instanceId: shortId.generate()
        };

        let request = ControlInstanceApiCalls.putNewControl(typeId, name);
        request.then(() => ControlInstanceServerActions.addControlSucceeded(dirtyId, dummyControlFromServer));
        request.catch(() => ControlInstanceServerActions.addControlFailed(dirtyId));

        LicenseActions.useLicenseSlot(typeId, 1);

        this.dispatch({
            typeId: typeId,
            name: name,
            dirty: dirtyId
        });
    }

    renameControl(instanceId, newName, oldName) {
        const dirtyId = shortId.generate();
        let request = ControlInstanceApiCalls.postRenamedControl(instanceId, newName);
        request.then(() => ControlInstanceServerActions.renameControlSucceeded(dirtyId, newName));
        request.catch(() => ControlInstanceServerActions.renameControlFailed(dirtyId, oldName));
        this.dispatch({
            instanceId: instanceId,
            newName: newName,
            dirty: dirtyId
        });
    }

    removeControl(instanceId) {
        const dirtyId = shortId.generate();
        let request = ControlInstanceApiCalls.postRemoveControl(instanceId);
        request.then(() => ControlInstanceServerActions.removeControlSucceeded(dirtyId));
        request.catch(() => ControlInstanceServerActions.removeControlFailed(dirtyId));
        this.dispatch({
            instanceId: instanceId,
            dirty: dirtyId
        });
    }
}

export default AltApp.createActions(ControlInstanceActions);
