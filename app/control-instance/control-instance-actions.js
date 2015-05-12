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

ControlInstanceActions.addControl.listen(onAddControl);
ControlInstanceActions.renameControl.listen(onRenameControl);
ControlInstanceActions.removeControl.listen(onRemoveControl);

function onAddControl(typeId, name) {
    const dirty = shortId.generate();
    const instanceId = shortId.generate();

    LicenseActions.useLicenseSlot(typeId, 1);
    this.optimistic(typeId, name, dirty);

    ControlInstanceApiCalls.putNewControl(typeId, name)
        .then(() => this.completed(instanceId, dirty))
        .catch(() => this.failed(dirty));
}

function onRenameControl(instanceId, newName, oldName) {
    const dirty = shortId.generate();
    this.optimistic(instanceId, newName, dirty);

    ControlInstanceApiCalls.postRenamedControl(instanceId, newName)
        .then(() => this.completed(newName, dirty))
        .catch(() => this.failed(oldName, dirty));
}

function onRemoveControl(instanceId) {
    const dirty = shortId.generate();
    this.optimistic(instanceId, dirty);

    ControlInstanceApiCalls.postRemoveControl(instanceId)
        .then(() => this.completed(dirty))
        .catch(() => this.failed(dirty));
}


export default ControlInstanceActions;
