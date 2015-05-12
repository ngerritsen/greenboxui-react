import Immutable from 'immutable';
import React from 'react/addons';
import shortId from 'shortid';

import Control from './control';
import ControlInstanceActions from './control-instance-actions';
import ControlInstanceStore from './control-instance-store';
import ControlInstanceView from './control-instance-view';

const ReactTestUtils = React.addons.TestUtils;

describe('control instance view', () => {
    const dummyControls = Immutable.List.of(
        new Control({ typeId: 'Pump', instanceId: shortId.generate(), name: 'Pump 1' }),
        new Control({ typeId: 'Valve', instanceId: shortId.generate(), name: 'Valve 1' }),
        new Control({ typeId: 'Valve', instanceId: shortId.generate(), name: 'Valve 2' })
    );

    let controlInstanceView;
    beforeEach(() => {
        ControlInstanceStore.controls = dummyControls;
        controlInstanceView = ReactTestUtils.renderIntoDocument(
            <ControlInstanceView/>
        );
    });

    afterEach(() => {
        controlInstanceView.componentWillUnmount();
        React.unmountComponentAtNode(document.body);
    });

    it('listens to control instance store for updates', () => {
        expect(controlInstanceView.state.controls).toEqual(dummyControls);
    });

    it('handles control renames', () => {
        const newName = 'newName';
        const instanceId = dummyControls.get(0).instanceId;

        spyOn(ControlInstanceActions, 'renameControl');

        controlInstanceView._handleEditControlName(newName, { instanceId: instanceId });
        expect(ControlInstanceActions.renameControl).toHaveBeenCalledWith(instanceId, newName);
    });

    it('handles control deletes', () => {
        const control = dummyControls.get(0);

        spyOn(ControlInstanceActions, 'removeControl');

        controlInstanceView._handleDeleteControl(control);

        expect(ControlInstanceActions.removeControl).toHaveBeenCalledWith(control.instanceId);
    });
});