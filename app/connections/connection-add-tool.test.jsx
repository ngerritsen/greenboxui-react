import Immutable from 'immutable';
import React from 'react/addons';
import shortId from 'shortid';

import Control from '../control-instance/control';
import ConnectionAddTool from './connection-add-tool';
import ConnectionActions from './connection-actions';
import ConnectionStore from './connection-store';
import ControlInstanceStore from '../control-instance/control-instance-store';

const ReactTestUtils = React.addons.TestUtils;

describe('connection add tool', () => {
    const pumpTypeId = shortId.generate();
    const valveTypeId = shortId.generate();

    const dummyControls = Immutable.List.of(
        new Control({ typeId: pumpTypeId, typeName: 'Pump', instanceId: shortId.generate(), name: 'Pump 1' }),
        new Control({ typeId: valveTypeId, typeName: 'Valve', instanceId: shortId.generate(), name: 'Valve 1' }),
        new Control({ typeId: valveTypeId, typeName: 'Valve', instanceId: shortId.generate(), name: 'Valve 2' })
    );

    let connectionAddTool;

    beforeEach(() => {
        ControlInstanceStore.controls = dummyControls;
        connectionAddTool = ReactTestUtils.renderIntoDocument(
            <ConnectionAddTool/>
        );
    });

    afterEach(() => {
        connectionAddTool.componentWillUnmount();
        React.unmountComponentAtNode(document.body);
    });

    it('adds a connection', () => {
        spyOn(ConnectionActions, 'addConnection');
        spyOn(ConnectionStore, 'connectionExists').and.returnValue(false);
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

    it('does not add an existing connection', () => {
        spyOn(ConnectionActions, 'addConnection');
        spyOn(ConnectionStore, 'connectionExists').and.returnValue(true);

        const submitButton = ReactTestUtils.findRenderedDOMComponentWithTag(connectionAddTool, 'button');

        ReactTestUtils.Simulate.click(submitButton);

        expect(ConnectionActions.addConnection).not.toHaveBeenCalled();
    });
});