import React from 'react/addons';
import ConnectionAddTool from './connection-add-tool';
import ConnectionActions from './connection-actions';
import ControlInstanceStore from '../control-instance/control-instance-store';

const ReactTestUtils = React.addons.TestUtils;

describe('connection add tool', () => {
    const dummyControls = [
        { typeId: 'Pump', instanceId: '0874134', name: 'Pump 1' },
        { typeId: 'Valve', instanceId: '138134', name: 'Valve 1' },
        { typeId: 'Valve', instanceId: '1381dd34', name: 'Valve 2' }
    ];

    let connectionAddTool;

    beforeEach(() => {
        spyOn(ControlInstanceStore, 'getState').and.returnValue({ controls: dummyControls });
        connectionAddTool = ReactTestUtils.renderIntoDocument(
            <ConnectionAddTool/>
        );
    });

    it('adds a connection', () => {
        spyOn(ConnectionActions, 'addConnection');

        const submitButton = ReactTestUtils.findRenderedDOMComponentWithTag(connectionAddTool, 'button');

        React.findDOMNode(connectionAddTool.refs.selectedSourceType).value = dummyControls[0].typeId;
        ReactTestUtils.Simulate.change(React.findDOMNode(connectionAddTool.refs.selectedSourceType));
        React.findDOMNode(connectionAddTool.refs.selectedSourceControl).value = dummyControls[0].instanceId;

        React.findDOMNode(connectionAddTool.refs.selectedTargetType).value = dummyControls[1].typeId;
        ReactTestUtils.Simulate.change(React.findDOMNode(connectionAddTool.refs.selectedTargetType));
        React.findDOMNode(connectionAddTool.refs.selectedTargetControl).value = dummyControls[1].instanceId;

        ReactTestUtils.Simulate.click(submitButton);

        expect(ConnectionActions.addConnection).toHaveBeenCalledWith(dummyControls[0], dummyControls[1]);
    });
});