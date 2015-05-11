import Reflux from 'reflux';
import shortId from 'shortid';
import ControlInstanceApiCalls from './control-instance-api-calls';
import LicenseActions from '../license/license-actions';
import LicenseStore from '../license/license-store';

let ControlInstanceActions = Reflux.createActions({
    'addControl': {children: ['optimistic', 'completed', 'failed']},
    'renameControl': {children: ['optimistic', 'completed', 'failed']},
    'removeControl': {children: ['optimistic', 'completed', 'failed']}
});

ControlInstanceActions.addControl.listen((typeId, name) => {
    const dirty = shortId.generate();
    const dummyControlFromServer = {
        typeId: typeId,
        name: name,
        instanceId: shortId.generate()
    };

    LicenseActions.useLicenseSlot(typeId, 1);
    this.optimistic(dirty, typeId, name);

    let request = ControlInstanceApiCalls.putNewControl(typeId, name);
    request.then(() => this.completed(dummyControlFromServer, dirty));
    request.catch(() => this.failed(dirty));
});

ControlInstanceActions.renameControl.listen((instanceId, newName, oldName) => {
    const dirty = shortId.generate();
    this.optimistic(instanceId, newName, dirty);

    let request = ControlInstanceApiCalls.postRenamedControl(instanceId, newName);
    request.then(() => this.completed(newName, dirty));
    request.catch(() => this.failed(oldName, dirty));
});

ControlInstanceActions.removeControl.listen((instanceId) => {
    const dirty = shortId.generate();
    this.optimistic(instanceId, dirty);

    let request = ControlInstanceApiCalls.postRemoveControl(instanceId);
    request.then(() => this.completed(dirty));
    request.catch(() => this.failed(dirty));
});


export default ControlInstanceActions;
