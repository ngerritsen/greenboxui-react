import Reflux from 'reflux';
import Immutable from 'immutable';
import ControlInstanceActions from './control-instance-actions';
import LicenseStore from '../license/license-store';
import Control from './control';

export default Reflux.createStore({
    init() {
        this.controls = Immutable.List();

        this.listenToMany(ControlInstanceActions);
    },
    onAddControlOptimistic(typeId, name, dirty) {
        let newControl = new Control({
            dirty: dirty,
            typeId: typeId,
            name: name,
            typeName: LicenseStore.getControlTypeName(typeId)
        });
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
    },

    onAddControlFailed(dirty) {
        this.controls = this.controls.filter((control) => {
            return control.dirty !== dirty;
        });
    },

    onRenameControlOptimistic(instanceId, newName, dirty) {
        this.controls = this.controls.map((control) => {
            if(control.instanceId === instanceId) {
                control = control.set('name', newName);
                control = control.set('dirty', dirty);
            }
            return control;
        });
    },

    onRenameControlCompleted(newName, dirty) {
        this.controls = this.controls.map((control) => {
            if(control.dirty === dirty) {
                control = control.set('name', newName);
                control = control.remove('dirty');
            }
            return control;
        });
    },

    onRenameControlFailed(oldName, dirty) {
        this.controls = this.controls.map((control) => {
            if(control.dirty === dirty) {
                control = control.set('name', oldName);
                control = control.remove('dirty');
            }
            return control;
        });
    },

    onRemoveControlOptimistic(instanceId, dirty) {
        this.controls = this.controls.map((control) => {
            if(control.instanceId === instanceId) {
                control = control.set('dirty', dirty);
            }
            return control;
        });
    },

    onRemoveControlCompleted(dirty) {
        this.controls = this.controls.filter((control) => control.dirty !== dirty);
    },

    onRemoveControlFailed(dirty) {
        this.controls = this.controls.map((control) => {
            if (control.dirty === dirty) {
                control = control.remove('dirty');
            }
            return control;
        });
    }
});
