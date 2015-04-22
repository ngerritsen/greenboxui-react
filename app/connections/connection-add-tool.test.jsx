import React from 'react/addons';
import ConnectionAddTool from './connection-add-tool';
import ConnectionActions from './connection-actions';
import ControlInstanceStore from '../control-instance/control-instance-store';
import Immutable from 'immutable';
import ControlInstance from '../control-instance/control-instance';

const ReactTestUtils = React.addons.TestUtils;

describe('connection add tool', () => {
    const dummyControls = Immutable.List.of(
        new ControlInstance({ typeId: 'Pump', instanceId: '0874134', name: 'Pump 1' }),
        new ControlInstance({ typeId: 'Valve', instanceId: '138134', name: 'Valve 1' }),
        new ControlInstance({ typeId: 'Valve', instanceId: '3451dd34', name: 'Valve 2' })
    );

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

        React.findDOMNode(connectionAddTool.refs.selectedSourceType).value = dummyControls.get(0).typeId;
        ReactTestUtils.Simulate.change(React.findDOMNode(connectionAddTool.refs.selectedSourceType));
        React.findDOMNode(connectionAddTool.refs.selectedSourceControl).value = dummyControls.get(0).instanceId;

        React.findDOMNode(connectionAddTool.refs.selectedTargetType).value = dummyControls.get(1).typeId;
        ReactTestUtils.Simulate.change(React.findDOMNode(connectionAddTool.refs.selectedTargetType));
        React.findDOMNode(connectionAddTool.refs.selectedTargetControl).value = dummyControls.get(1).instanceId;

        ReactTestUtils.Simulate.click(submitButton);

        expect(ConnectionActions.addConnection).toHaveBeenCalledWith(dummyControls.get(0), dummyControls.get(1));
    });
});