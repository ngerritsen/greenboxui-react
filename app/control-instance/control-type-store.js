import Immutable from 'immutable';
import Reflux from 'reflux';
import ControlInstanceStore from './control-instance-store';
import LicenseStore from '../license/license-store';

export default Reflux.createStore({
    init() {
        this.controlTypes = Immutable.List();

        //this.bindAction(ControlInstanceActions.addControlSucceeded, this.onControlsChanged);
        //this.bindAction(ControlInstanceServerActions.removeControlSucceeded, this.onControlsChanged);

        this.onControlsChanged();
    },
    onControlsChanged() {
        this.controlTypes =
            ControlInstanceStore.controls
                .map((control) => control.typeId)
                .toOrderedSet()
                .toList()
                .map((typeId) => { return { id: typeId, name: LicenseStore.getControlTypeName(typeId) }});
    }
});
