import React from 'react/addons';
import AltApp from '../core/alt-app';
import ConnectionActions from './connection-actions';
import ConnectionView from './connection-view';
import ConnectionStore from './connection-store';

const ReactTestUtils = React.addons.TestUtils;

describe('connection view', () => {
    const addConnectionAction = ConnectionActions.ADD_CONNECTION;

    const dummyConnections = [
        {
            connectionId: '58952352',
            sourceControl: { typeId: 'Pump', instanceId: '0874134', name: 'Pump 1' },
            targetControl: { typeId: 'Valve', instanceId: '138134', name: 'Valve 1' }
        },
        {
            connectionId: '89f304g3',
            sourceControl: { typeId: 'Pump', instanceId: '0874134', name: 'Pump 1' },
            targetControl: { typeId: 'Valve', instanceId: '345254', name: 'Valve 2' }
        },
        {
            connectionId: '23ct7340t3',
            sourceControl: { typeId: 'Pump', instanceId: '0874134', name: 'Pump 1' },
            targetControl: { typeId: 'Valve', instanceId: '23534543', name: 'Valve 3' }
        }
    ];

    let connectionView;

    beforeEach(() => {
        spyOn(ConnectionStore, 'getState').and.returnValue({ connections: dummyConnections });
        connectionView = ReactTestUtils.renderIntoDocument(
            <ConnectionView/>
        );
    });

    it('gets initial state from connection store', () => {
        expect(ConnectionStore.getState).toHaveBeenCalled();
        expect(connectionView.state.connections).toEqual(dummyConnections);
    });

    it('listens to connection store for updates', () => {
        AltApp.dispatcher.dispatch({ action: addConnectionAction, data: null });

        expect(ConnectionStore.getState).toHaveBeenCalled();
        expect(connectionView.state.connections).toEqual(dummyConnections);
    });

    it('handles connection deletes', () => {
        const connection = dummyConnections[0];

        spyOn(ConnectionActions, 'removeConnection');

        connectionView._handleDeleteConnection(connection);

        expect(ConnectionActions.removeConnection).toHaveBeenCalledWith(connection.connectionId);
    });
});