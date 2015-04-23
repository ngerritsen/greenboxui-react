import React from 'react/addons';
import AltApp from '../core/alt-app';
import Immutable from 'immutable';
import ControlInstanceActions from './control-instance-actions';
import ControlInstanceView from './control-instance-view';
import ControlInstanceStore from './control-instance-store';
import ControlInstance from './control-instance';

const ReactTestUtils = React.addons.TestUtils;

describe('control instance view', () => {
    const addControlAction = ControlInstanceActions.ADD_CONTROL;

    const dummyControls = Immutable.List.of(
        new ControlInstance({ typeId: 'Pump', instanceId: '0874134', name: 'Pump 1' }),
        new ControlInstance({ typeId: 'Valve', instanceId: '138134', name: 'Valve 1' }),
        new ControlInstance({ typeId: 'Valve', instanceId: '9874200', name: 'Valve 2' })
    );

    let controlInstanceView;
    beforeEach(() => {
        controlInstanceView = ReactTestUtils.renderIntoDocument(
            <ControlInstanceView/>
        );
    });

    it('gets initial state from control instance store', () => {
        spyOn(ControlInstanceStore, 'getState').and.returnValue({ controls: dummyControls });

        controlInstanceView = ReactTestUtils.renderIntoDocument(
            <ControlInstanceView/>
        );

        expect(ControlInstanceStore.getState).toHaveBeenCalled();
        expect(controlInstanceView.state.controls).toEqual(dummyControls);
    });

    it('gets listens to control instance store for updates', () => {
        spyOn(ControlInstanceStore, 'getState').and.returnValue({ controls: dummyControls });
        AltApp.dispatcher.dispatch({ action: addControlAction, data: null });

        expect(ControlInstanceStore.getState).toHaveBeenCalled();
        expect(controlInstanceView.state.controls).toEqual(dummyControls);
    });

    it('handles control renames', () => {
        spyOn(ControlInstanceStore, 'getState').and.returnValue({ controls: dummyControls });
        const newName = 'newName';
        const instanceId = dummyControls.get(0).instanceId;

        spyOn(ControlInstanceActions, 'renameControl');

        controlInstanceView._handleEditControlName(newName, { instanceId: instanceId });
        expect(ControlInstanceActions.renameControl).toHaveBeenCalledWith(instanceId, newName);
    });

    it('handles control deletes', () => {
        spyOn(ControlInstanceStore, 'getState').and.returnValue({ controls: dummyControls });
        const control = dummyControls.get(0);

        spyOn(ControlInstanceActions, 'removeControl');

        controlInstanceView._handleDeleteControl(control);

        expect(ControlInstanceActions.removeControl).toHaveBeenCalledWith(control.instanceId);
    });
});