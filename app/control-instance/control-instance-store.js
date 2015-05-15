import Immutable from 'immutable';
import Reflux from 'reflux';

import Control from './control';
import ControlInstanceActions from './control-instance-actions';
import LicenseStore from '../license/license-store';
import LogLevels from '../logging/log-levels';
import LoggingActions from '../logging/logging-actions';

export default Reflux.createStore({
    init() {
        this.controls = Immutable.List();

        this.listenToMany(ControlInstanceActions);
    },
    onAddControlOptimistic(typeId, name, dirty) {
        const typeName = LicenseStore.getControlTypeName(typeId);
        let newControl = new Control({
            dirty: dirty,
            typeId: typeId,
            name: name,
            typeName: typeName
        });
        LoggingActions.log(LogLevels.info, `Adding control of type ${typeName} with name: ${name}`);
        this.controls = this.controls.push(newControl);
        this.trigger(this.controls);
    },

    onAddControlCompleted(instanceId, dirty) {
        this.controls = this.controls.map((control) => {
            if (control.dirty === dirty) {
                control = control.remove('dirty');
                control = control.set('instanceId', instanceId);
            }
            return control;
        });
        this.trigger(this.controls);
    },

    onAddControlFailed(dirty) {
        this.controls = this.controls.filter((control) => {
            return control.dirty !== dirty;
        });
        this.trigger(this.controls);
    },

    onRenameControlOptimistic(instanceId, newName, dirty) {
        this.controls = this.controls.map((control) => {
            if(control.instanceId === instanceId) {
                control = control.set('name', newName);
                control = control.set('dirty', dirty);
            }
            return control;
        });
        this.trigger(this.controls);
    },

    onRenameControlCompleted(newName, dirty) {
        this.controls = this.controls.map((control) => {
            if(control.dirty === dirty) {
                control = control.set('name', newName);
                control = control.remove('dirty');
            }
            return control;
        });
        this.trigger(this.controls);
    },

    onRenameControlFailed(oldName, dirty) {
        this.controls = this.controls.map((control) => {
            if(control.dirty === dirty) {
                control = control.set('name', oldName);
                control = control.remove('dirty');
            }
            return control;
        });
        this.trigger(this.controls);
    },

    onRemoveControlOptimistic(instanceId, dirty) {
        this.controls = this.controls.map((control) => {
            if(control.instanceId === instanceId) {
                control = control.set('dirty', dirty);
            }
            return control;
        });
        this.trigger(this.controls);
    },

    onRemoveControlCompleted(dirty) {
        this.controls = this.controls.filter((control) => control.dirty !== dirty);
        this.trigger(this.controls);
    },

    onRemoveControlFailed(dirty) {
        this.controls = this.controls.map((control) => {
            if (control.dirty === dirty) {
                control = control.remove('dirty');
            }
            return control;
        });
        this.trigger(this.controls);
    }
});
