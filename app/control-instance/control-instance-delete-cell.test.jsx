import React from 'react/addons';
import ControlInstanceDeleteCell from './control-instance-delete-cell';
import ControlInstanceActions from './control-instance-actions';

const ReactTestUtils = React.addons.TestUtils;

describe('control instance delete cell', () => {
    const dummyControl = { typeId: 'Valve', instanceId: '9874200', name: 'Valve 1' };

    let controlInstanceDeleteCell;

    beforeEach(() => {
        controlInstanceDeleteCell = ReactTestUtils.renderIntoDocument(
            <ControlInstanceDeleteCell context={dummyControl}/>
        );
    });

    it('handles deletes', () => {
        spyOn(ControlInstanceActions, 'removeControl');

        ReactTestUtils.Simulate.click(controlInstanceDeleteCell.getDOMNode());

        expect(ControlInstanceActions.removeControl).toHaveBeenCalledWith(dummyControl.instanceId);
    });
});