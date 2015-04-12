import React from 'react/addons';
import ControlInstanceView from './control-instance-view';
import ControlInstanceStore from './control-instance-store';

const ReactTestUtils = React.addons.TestUtils;

describe('control instance view tests', () => {
    const dummyControls = [
        { typeId: 'Pump', instanceId: '0874134', name: 'Pump 1' },
        { typeId: 'Valve', instanceId: '138134', name: 'Valve 1' },
        { typeId: 'Valve', instanceId: '9874200', name: 'Valve 2' }
    ];

    let controlInstanceView;

    beforeEach(() => {
        gridBody = ReactTestUtils.renderIntoDocument(
            <ControlInstanceView/>
        );
    });

    it('listens to control instance store', () => {

    });
});