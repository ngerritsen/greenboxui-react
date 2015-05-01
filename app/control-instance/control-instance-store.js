import AltApp from '../core/alt-app';
import Immutable from 'immutable';
import ControlInstanceActions from './control-instance-actions';
import ControlInstanceServerActions from './control-instance-server-actions';
import LicenseStore from '../license/license-store';
import Control from './control';

class ControlInstanceStore {
    constructor() {
        this.controls = Immutable.List();

        this.bindAction(ControlInstanceActions.addControl, this.onAddControlOptimistic);
        this.bindAction(ControlInstanceServerActions.addControlSucceeded, this.onAddControlSucceeded);
        this.bindAction(ControlInstanceServerActions.addControlFailed, this.onAddControlFailed);

        this.bindAction(ControlInstanceActions.renameControl, this.onRenameControlOptimistic);
        this.bindAction(ControlInstanceServerActions.renameControlSucceeded, this.onRenameControlSucceeded);
        this.bindAction(ControlInstanceServerActions.renameControlFailed, this.onRenameControlFailed);

        this.bindAction(ControlInstanceActions.removeControl, this.onRemoveControlOptimistic);
        this.bindAction(ControlInstanceServerActions.removeControlSucceeded, this.onRemoveControlSucceeded);
        this.bindAction(ControlInstanceServerActions.removeControlFailed, this.onRemoveControlFailed);

        this.on('init', this.bootstrap);
    }

    bootstrap() {
        // Prevent alt app flush from converting list to regular js array, sorry guys..
        if (! Immutable.List.isList(this.controls)) {
            this.controls = Immutable.List(this.controls);
        }
    }

    onAddControlOptimistic(payload) {
        if(payload) {
            let newControl = new Control(payload);
            const typeName = LicenseStore.getControlTypeName(newControl.typeId);
            newControl = newControl.set('typeName', typeName);
            this.controls = this.controls.push(newControl);
        }
    }

    onAddControlSucceeded(payload) {
        this.controls = this.controls.map((control) => {
            if (control.dirty === payload.clean) {
                control = control.remove('dirty');
                control = control.set('instanceId', payload.instanceId);
            }
            return control;
        });
    }

    onAddControlFailed(payload) {
        this.controls = this.controls.filter((control) => {
            return control.dirty !== payload.clean;
        });
    }

    onRenameControlOptimistic(payload) {
        const {newName, instanceId, dirty} = payload;
        this.controls = this.controls.map((control) => {
            if(control.instanceId === instanceId) {
                control = control.set('name', newName);
                control = control.set('dirty', dirty);
            }
            return control;
        });
    }

    onRenameControlSucceeded(payload) {
        const {newName, clean} = payload;
        this.controls = this.controls.map((control) => {
            if(control.dirty === clean) {
                control = control.set('name', newName);
                control = control.remove('dirty');
            }
            return control;
        });
    }

    onRenameControlFailed(payload) {
        const {oldName, clean} = payload;
        this.controls = this.controls.map((control) => {
            if(control.dirty === clean) {
                control = control.set('name', oldName);
                control = control.remove('dirty');
            }
            return control;
        });
    }

    onRemoveControlOptimistic(payload) {
        const {instanceId, dirty} = payload;
        this.controls = this.controls.map((control) => {
            if(control.instanceId === instanceId) {
                control = control.set('dirty', dirty);
            }
            return control;
        });
    }

    onRemoveControlSucceeded(payload) {
        this.controls = this.controls.filter((control) => control.dirty !== payload.clean);
    }

    onRemoveControlFailed(payload) {
        this.controls = this.controls.map((control) => {
            if (control.dirty === payload.clean) {
                control = control.remove('dirty');
            }
            return control;
        });
    }
}


export default AltApp.createStore(ControlInstanceStore, 'ControlInstanceStore');
