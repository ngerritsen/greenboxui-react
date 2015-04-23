import React from 'react/addons';
import AltApp from '../core/alt-app';
import Immutable from 'immutable';

import ConnectionActions from './connection-actions';
import ConnectionView from './connection-view';
import ConnectionStore from './connection-store';
import Connection from './connection';

const ReactTestUtils = React.addons.TestUtils;

describe('connection view', () => {
    const addConnectionAction = ConnectionActions.ADD_CONNECTION;

    const dummyConnections = Immutable.List.of(
        new Connection({
            connectionId: '58952352',
            sourceControlInstanceId: '340fr7tj34t0',
            sourceControlTypeId: 'Pump',
            sourceControlName: 'Pump 1',
            targetControlInstanceId: 'f54y54yf56yh',
            targetControlTypeId: 'Valve',
            targetControlname: 'Valve 1'
        }),
        new Connection({
            connectionId: '89f304g3',
            sourceControlInstanceId: '340fr7tj34t0',
            sourceControlTypeId: 'Pump',
            sourceControlName: 'Pump 1',
            targetControlInstanceId: '45fy56yf54y',
            targetControlTypeId: 'Valve',
            targetControlname:  'Valve 2'
        }),
        new Connection({
            connectionId: '23ct7340t3',
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
        const connection = dummyConnections.get(0);

        spyOn(ConnectionActions, 'removeConnection');

        connectionView._handleDeleteConnection(connection);

        expect(ConnectionActions.removeConnection).toHaveBeenCalledWith(connection.connectionId);
    });
});