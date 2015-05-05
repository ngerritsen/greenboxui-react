import Immutable from 'immutable';
import AltApp from '../core/alt-app';
import ControlInstanceStore from './control-instance-store';
import LicenseStore from '../license/license-store';
import ControlInstanceServerActions from './control-instance-server-actions';

class ControlTypeStore {
    constructor() {
        this.controlTypes = Immutable.List();

        this.bindAction(ControlInstanceServerActions.addControlSucceeded, this.onControlsChanged);
        this.bindAction(ControlInstanceServerActions.removeControlSucceeded, this.onControlsChanged);

        this.on('init', this.bootstrap);

        this.onControlsChanged();
    }

    bootstrap() {
        if (! Immutable.List.isList(this.controlTypes)) {
            this.controlTypes = Immutable.List(this.controlTypes);
        }
    }

    onControlsChanged() {
        const controls = ControlInstanceStore.getState().controls;
        this.controlTypes =
            controls
                .map((control) => control.typeId)
                .toOrderedSet()
                .toList()
                .map((typeId) => { return { id: typeId, name: LicenseStore.getControlTypeName(typeId) }});
        console.log(this.controlTypes.toJS());
    };
}

export default AltApp.createStore(ControlTypeStore, 'ControlTypeStore');