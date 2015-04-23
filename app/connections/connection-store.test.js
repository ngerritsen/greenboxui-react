import AltApp from '../core/alt-app';
import shortId from 'shortid';
import ConnectionStore from './connection-store';
import ConnectionActions from './connection-actions';
import ConnectionServerActions from './connection-server-actions';

describe('connection store', () => {
    const dirtyIdA = shortId.generate();
    const dirtyIdB = shortId.generate();

    const testConnectionA = {
        connectionId: shortId.generate(),
        sourceControl: { typeId: 'Pump', connectionId: '0874134', name: 'Pump 1' },
        targetControl: { typeId: 'Valve', connectionId: '138134', name: 'Valve 1' },
        dirty: dirtyIdA
    };
    const testConnectionB = {
        connectionId: shortId.generate(),
        sourceControl: { typeId: 'Pump', connectionId: '0874134', name: 'Pump 1' },
        targetControl: { typeId: 'Valve', connectionId: '345254', name: 'Valve 2' },
        dirty: dirtyIdB
    };

    afterEach(() => AltApp.flush());

    describe('add a connection tests', () => {
        it('optimistically adds a connection', () => {
            optimisticallyAddConnection(testConnectionA);

            expect(ConnectionStore.getState().connections.count()).toEqual(1);
            expect(ConnectionStore.getState().connections.get(0).dirty).toEqual(testConnectionA.dirty);
        });

        it('adds connection actually', () => {
            optimisticallyAddConnection(testConnectionA);
            actuallyAddConnection(testConnectionA.connectionId, dirtyIdA);

            expect(ConnectionStore.getState().connections.count()).toEqual(1);
            expect(ConnectionStore.getState().connections.get(0).dirty).toBeFalsy();
            expect(ConnectionStore.getState().connections.get(0).connectionId).toEqual(testConnectionA.connectionId);
        });

        it('adds multiple connections actually', () => {
            optimisticallyAddConnection(testConnectionA);
            optimisticallyAddConnection(testConnectionB);
            actuallyAddConnection(testConnectionA.connectionId, dirtyIdA);
            actuallyAddConnection(testConnectionB.connectionId, dirtyIdB);

            expect(ConnectionStore.getState().connections.count()).toEqual(2);
            expect(ConnectionStore.getState().connections.get(0).dirty).toBeFalsy();
            expect(ConnectionStore.getState().connections.get(0).connectionId).toEqual(testConnectionA.connectionId);
            expect(ConnectionStore.getState().connections.get(1).dirty).toBeFalsy();
            expect(ConnectionStore.getState().connections.get(1).connectionId).toEqual(testConnectionB.connectionId);
        });

        it('ignores invalid connections', () => {
            const invalidConnection1 = {sourceControl: {}};
            const invalidConnection2 = {targetControl: {}};

            optimisticallyAddConnection(invalidConnection1);
            optimisticallyAddConnection(invalidConnection2);

            expect(ConnectionStore.getState().connections.count()).toEqual(0);
        });

        it('cancels addition of a connection if addition failed', () => {
            optimisticallyAddConnection(testConnectionA);
            failToAddConnection(dirtyIdA);

            expect(ConnectionStore.getState().connections.count()).toEqual(0);
        });
    });

    describe('remove a connection tests', () => {
        it('optimistically removes a connection', () => {
            const dirtyId = shortId.generate();

            optimisticallyAddConnection(testConnectionA);
            actuallyAddConnection(testConnectionA.connectionId, dirtyIdA);

            const connectionIdToRemove = ConnectionStore.getState().connections.get(0).connectionId;

            optmisticallyRemoveConnection(connectionIdToRemove, dirtyId);

            expect(ConnectionStore.getState().connections.count()).toEqual(1);
            expect(ConnectionStore.getState().connections.get(0).dirty).toEqual(dirtyId);
        });

        it('actually removes a connection', () => {
            const dirtyId = shortId.generate();

            optimisticallyAddConnection(testConnectionA);
            actuallyAddConnection(testConnectionA.connectionId, dirtyIdA);

            const connectionIdToRemove = ConnectionStore.getState().connections.get(0).connectionId;

            optmisticallyRemoveConnection(connectionIdToRemove, dirtyId);
            actuallyRemoveConnection(dirtyId);

            expect(ConnectionStore.getState().connections.count()).toEqual(0);
        });

        it('removes one and the right connection from multiple connections', () => {
            const dirtyId = shortId.generate();

            optimisticallyAddConnection(testConnectionA);
            actuallyAddConnection(testConnectionA.connectionId, dirtyIdA);

            optimisticallyAddConnection(testConnectionB);
            actuallyAddConnection(testConnectionB.connectionId, dirtyIdB);

            const connectionIdA = ConnectionStore.getState().connections.get(0).connectionId;
            const connectionIdB = ConnectionStore.getState().connections.get(1).connectionId;

            optmisticallyRemoveConnection(connectionIdA, dirtyId);
            actuallyRemoveConnection(dirtyId);

            expect(ConnectionStore.getState().connections.count()).toEqual(1);
            expect(ConnectionStore.getState().connections.get(0).connectionId).toEqual(connectionIdB);
        });

        it('cancels removal of a connection if removal failed', () => {
            const dirtyId = shortId.generate();

            optimisticallyAddConnection(testConnectionA);
            actuallyAddConnection(testConnectionA.connectionId, dirtyIdA);

            const connectionIdToRemove = ConnectionStore.getState().connections.get(0).connectionId;

            optmisticallyRemoveConnection(connectionIdToRemove, dirtyId);
            failToRemoveConnection(dirtyId);

            expect(ConnectionStore.getState().connections.count()).toEqual(1);
            expect(ConnectionStore.getState().connections.get(0).dirty).toBeFalsy();
        });
    });

    function optimisticallyAddConnection(connection) {
        AltApp.dispatcher.dispatch({
            action: ConnectionActions.ADD_CONNECTION,
            data: connection
        });
    }

    function actuallyAddConnection(connectionId, dirtyId) {
        AltApp.dispatcher.dispatch({
            action: ConnectionServerActions.ADD_CONNECTION_SUCCEEDED,
            data: { connectionId: connectionId, clean: dirtyId }
        });
    }

    function failToAddConnection(dirtyId) {
        AltApp.dispatcher.dispatch({
            action: ConnectionServerActions.ADD_CONNECTION_FAILED,
            data: {  clean: dirtyId }
        });
    }

    function optmisticallyRemoveConnection(connectionId, dirtyId) {
        AltApp.dispatcher.dispatch({
            action: ConnectionActions.REMOVE_CONNECTION,
            data: { connectionId: connectionId, dirty: dirtyId }
        });
    }

    function actuallyRemoveConnection(dirtyId) {
        AltApp.dispatcher.dispatch({
            action: ConnectionServerActions.REMOVE_CONNECTION_SUCCEEDED,
            data: { clean: dirtyId }
        });
    }

    function failToRemoveConnection(dirtyId) {
        AltApp.dispatcher.dispatch({
            action: ConnectionServerActions.REMOVE_CONNECTION_FAILED,
            data: {  clean: dirtyId }
        });
    }

});
