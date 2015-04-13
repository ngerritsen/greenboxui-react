import React from 'react/addons';
import AltApp from '../core/alt-app';
import ControlInstanceActions from './control-instance-actions';
import ControlInstanceView from './control-instance-view';
import ControlInstanceStore from './control-instance-store';

const ReactTestUtils = React.addons.TestUtils;

describe('control instance view tests', () => {
    const addControlAction = ControlInstanceActions.ADD_CONTROL;

    const dummyControls = [
        { typeId: 'Pump', instanceId: '0874134', name: 'Pump 1' },
        { typeId: 'Valve', instanceId: '138134', name: 'Valve 1' },
        { typeId: 'Valve', instanceId: '9874200', name: 'Valve 2' }
    ];

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
        AltApp.dispatcher.dispatch({ action: addControlAction, data: {} });

        expect(ControlInstanceStore.getState).toHaveBeenCalled();
        expect(controlInstanceView.state.controls).toEqual(dummyControls);
    });

    it('handles control renames', () => {
        const newName = 'newName';
        const instanceId = dummyControls[0].instanceId;

        spyOn(ControlInstanceActions, 'renameControl');

        controlInstanceView._handleEditControlName(newName, { instanceId: instanceId });

        expect(ControlInstanceActions.renameControl).toHaveBeenCalledWith(instanceId, newName);
    });
});