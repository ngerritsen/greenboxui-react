import React from 'react/addons';
import Immutable from 'immutable';
import shortId from 'shortid';
import ConnectionActions from './connection-actions';
import ConnectionView from './connection-view';
import ConnectionStore from './connection-store';
import Connection from './connection';

const ReactTestUtils = React.addons.TestUtils;

describe('connection view', () => {
    const dummyConnections = Immutable.List.of(
        new Connection({
            connectionId: shortId.generate(),
            sourceControlInstanceId: '340fr7tj34t0',
            sourceControlTypeId: 'Pump',
            sourceControlName: 'Pump 1',
            targetControlInstanceId: 'f54y54yf56yh',
            targetControlTypeId: 'Valve',
            targetControlname: 'Valve 1'
        }),
        new Connection({
            connectionId: shortId.generate(),
            sourceControlInstanceId: '340fr7tj34t0',
            sourceControlTypeId: 'Pump',
            sourceControlName: 'Pump 1',
            targetControlInstanceId: '45fy56yf54y',
            targetControlTypeId: 'Valve',
            targetControlname:  'Valve 2'
        }),
        new Connection({
            connectionId: shortId.generate(),
            sourceControlInstanceId: '340fr7tj34t0',
            sourceControlTypeId: 'Pump',
            sourceControlName: 'Pump 1',
            targetControlInstanceId: 'f56y54yf54y54fy',
            targetControlTypeId: 'Valve',
            targetControlName:  'Valve 3'
        })
    );

    let connectionView;

    beforeEach(() => {
        ConnectionStore.connections = dummyConnections;
        connectionView = ReactTestUtils.renderIntoDocument(
            <ConnectionView/>
        );
    });

    afterEach(() => {
        connectionView.componentWillUnmount();
        React.unmountComponentAtNode(document.body);
    });

    it('gets initial state from connection store', () => {
        expect(connectionView.state.connections).toEqual(dummyConnections);
    });

    it('handles connection deletes', () => {
        const connection = dummyConnections.get(0);

        spyOn(ConnectionActions, 'removeConnection');

        connectionView._handleDeleteConnection(connection);

        expect(ConnectionActions.removeConnection).toHaveBeenCalledWith(connection.connectionId);
    });
});