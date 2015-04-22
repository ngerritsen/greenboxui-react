import AltApp from '../core/alt-app';
import ControlInstanceActions from './control-instance-actions';
import ControlInstanceServerActions from './control-instance-server-actions';
import ControlInstance from './control-instance';
import Immutable from 'immutable';

class ControlInstanceStore {
    constructor() {
        this.on('init', this.bootstrap);
        this.on('bootstrap', this.bootstrap);

        this.controls = Immutable.List();

        this.bindAction(ControlInstanceActions.addControl, this.onControlOptimisticallyAdded);
        this.bindAction(ControlInstanceServerActions.addControlSucceeded, this.onControlSuccessfullyAdded);
        this.bindAction(ControlInstanceServerActions.addControlFailed, this.onControlUnsuccessfullyAdded);

        this.bindAction(ControlInstanceActions.renameControl, this.onControlOptimisticallyRenamed);
        this.bindAction(ControlInstanceServerActions.renameControlSucceeded, this.onControlSuccessfullyRenamed);
        this.bindAction(ControlInstanceServerActions.renameControlFailed, this.onControlUnsuccessfullyRenamed);

        this.bindAction(ControlInstanceActions.removeControl, this.onControlOptimisticallyRemoved);
        this.bindAction(ControlInstanceServerActions.removeControlSucceeded, this.onControlSuccessfullyRemoved);
        this.bindAction(ControlInstanceServerActions.removeControlFailed, this.onControlUnsuccessfullyRemoved);


        this.exportPublicMethods({
            _getNewInstanceId: this._getNewInstanceId
        });
    }

    bootstrap() {
        // Prevent alt app flush from converting list to regular js array, sorry guys..
        if (! Immutable.List.isList(this.controls)) {
            this.controls = Immutable.List(this.controls);
        }
    }

    onControlOptimisticallyAdded(payload) {
        if(payload) {
            const newControl = new ControlInstance(payload);
            this.controls = this.controls.push(newControl);
        }
    }

    onControlSuccessfullyAdded(payload) {
        this.controls = this.controls.map((control) => {
            if (control.dirty === payload.clean) {
                control = control.remove('dirty');
                control = control.set('instanceId', payload.instanceId);
            }
            return control;
        });
    }

    onControlUnsuccessfullyAdded(payload) {
        this.controls = this.controls.filter((control) => {
            return control.dirty !== payload.clean;
        });
    }

    onControlOptimisticallyRenamed(payload) {
        const {newName, instanceId, dirty} = payload;
        this.controls = this.controls.map((control) => {
            if(control.instanceId === instanceId) {
                control = control.set('name', newName);
                control = control.set('dirty', dirty);
            }
            return control;
        });
    }

    onControlSuccessfullyRenamed(payload) {
        const {newName, clean} = payload;
        this.controls = this.controls.map((control) => {
            if(control.dirty === clean) {
                control = control.set('name', newName);
                control = control.remove('dirty');
            }
            return control;
        });
    }

    onControlUnsuccessfullyRenamed(payload) {
        const {oldName, clean} = payload;
        this.controls = this.controls.map((control) => {
            if(control.dirty === clean) {
                control = control.set('name', oldName);
                control = control.remove('dirty');
            }
            return control;
        });
    }

    onControlOptimisticallyRemoved(payload) {
        const {instanceId, dirty} = payload;
        this.controls = this.controls.map((control) => {
            if(control.instanceId === instanceId) {
                control = control.set('dirty', dirty);
            }
            return control;
        });

    }

    onControlSuccessfullyRemoved(payload) {
        const clean = payload.clean;
        this.controls = this.controls.filter((control) => control.dirty !== clean);
    }

    onControlUnsuccessfullyRemoved(payload) {
        const clean = payload.clean;
        this.controls = this.controls.map((control) => {
            if (control.dirty === payload) {
                control = control.remove('dirty');
            }
            return control;
        });
    }

    _getNewInstanceId() {
        return Math.round((Math.random() * 1000000))
    }
}

export default AltApp.createStore(ControlInstanceStore, 'ControlInstanceStore');
