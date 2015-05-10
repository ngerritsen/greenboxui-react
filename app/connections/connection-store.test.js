import shortId from 'shortid';
import ConnectionStore from './connection-store';
import ConnectionActions from './connection-actions';
import ConnectionServerActions from './connection-server-actions';

describe('connection store', () => {
    const dirtyIdA = shortId.generate();
    const dirtyIdB = shortId.generate();

    const typeIdA = shortId.generate();
    const typeIdB = shortId.generate();

    const dummyControlA = { instanceId: shortId.generate(), typeId: typeIdA, name: 'Pump 1' };
    const dummyControlB = { instanceId: shortId.generate(), typeId: typeIdB, name: 'Valve 1' };
    const dummyControlC = { instanceId: shortId.generate(), typeId: typeIdB, name: 'Valve 1' };

    const testConnectionA = {
        connectionId: shortId.generate(),
        sourceControl: dummyControlA,
        targetControl: dummyControlB,
        dirty: dirtyIdA
    };
    const testConnectionB = {
        connectionId: shortId.generate(),
        sourceControl: dummyControlA,
        targetControl: dummyControlC,
        dirty: dirtyIdB
    };

    beforeEach(() => {
        ConnectionStore.connections = Immutable.List();
        jasmine.clock().install()
    });

    afterEach(() => {
        ConnectionStore.connections = Immutable.List();
        jasmine.clock().uninstall()
    });

    describe('add a connection tests', () => {
        it('optimistically adds a connection', () => {
            optimisticallyAddConnection(testConnectionA);

            expect(ConnectionStore.connections.count()).toEqual(1);
            expect(ConnectionStore.connections.get(0).dirty).toEqual(testConnectionA.dirty);
        });

        it('adds connection actually', () => {
            optimisticallyAddConnection(testConnectionA);
            actuallyAddConnection(testConnectionA.connectionId, dirtyIdA);

            expect(ConnectionStore.connections.count()).toEqual(1);
            expect(ConnectionStore.connections.get(0).dirty).toBeFalsy();
            expect(ConnectionStore.connections.get(0).connectionId).toEqual(testConnectionA.connectionId);
        });

        it('adds multiple connections actually', () => {
            optimisticallyAddConnection(testConnectionA);
            optimisticallyAddConnection(testConnectionB);
            actuallyAddConnection(testConnectionA.connectionId, dirtyIdA);
            actuallyAddConnection(testConnectionB.connectionId, dirtyIdB);

            expect(ConnectionStore.connections.count()).toEqual(2);
            expect(ConnectionStore.connections.get(0).dirty).toBeFalsy();
            expect(ConnectionStore.connections.get(0).connectionId).toEqual(testConnectionA.connectionId);
            expect(ConnectionStore.connections.get(1).dirty).toBeFalsy();
            expect(ConnectionStore.connections.get(1).connectionId).toEqual(testConnectionB.connectionId);
        });

        it('ignores invalid connections', () => {
            const invalidConnection1 = {sourceControl: {}};
            const invalidConnection2 = {targetControl: {}};

            optimisticallyAddConnection(invalidConnection1);
            optimisticallyAddConnection(invalidConnection2);

            expect(ConnectionStore.connections.count()).toEqual(0);
        });

        it('cancels addition of a connection if addition failed', () => {
            optimisticallyAddConnection(testConnectionA);
            failToAddConnection(dirtyIdA);

            expect(ConnectionStore.connections.count()).toEqual(0);
        });

        it('does not add an existing connection', () => {
            optimisticallyAddConnection(testConnectionA);
            optimisticallyAddConnection(testConnectionA);

            expect(ConnectionStore.connections.count()).toEqual(1);
        });
    });

    describe('remove a connection tests', () => {
        it('optimistically removes a connection', () => {
            const dirtyId = shortId.generate();

            optimisticallyAddConnection(testConnectionA);
            actuallyAddConnection(testConnectionA.connectionId, dirtyIdA);

            const connectionIdToRemove = ConnectionStore.connections.get(0).connectionId;

            optmisticallyRemoveConnection(connectionIdToRemove, dirtyId);

            expect(ConnectionStore.connections.count()).toEqual(1);
            expect(ConnectionStore.connections.get(0).dirty).toEqual(dirtyId);
        });

        it('actually removes a connection', () => {
            const dirtyId = shortId.generate();

            optimisticallyAddConnection(testConnectionA);
            actuallyAddConnection(testConnectionA.connectionId, dirtyIdA);

            const connectionIdToRemove = ConnectionStore.connections.get(0).connectionId;

            optmisticallyRemoveConnection(connectionIdToRemove, dirtyId);
            actuallyRemoveConnection(dirtyId);

            expect(ConnectionStore.connections.count()).toEqual(0);
        });

        it('removes one and the right connection from multiple connections', () => {
            const dirtyId = shortId.generate();

            optimisticallyAddConnection(testConnectionA);
            actuallyAddConnection(testConnectionA.connectionId, dirtyIdA);

            optimisticallyAddConnection(testConnectionB);
            actuallyAddConnection(testConnectionB.connectionId, dirtyIdB);

            const connectionIdA = ConnectionStore.connections.get(0).connectionId;
            const connectionIdB = ConnectionStore.connections.get(1).connectionId;

            optmisticallyRemoveConnection(connectionIdA, dirtyId);
            actuallyRemoveConnection(dirtyId);

            expect(ConnectionStore.connections.count()).toEqual(1);
            expect(ConnectionStore.connections.get(0).connectionId).toEqual(connectionIdB);
        });

        it('cancels removal of a connection if removal failed', () => {
            const dirtyId = shortId.generate();

            optimisticallyAddConnection(testConnectionA);
            actuallyAddConnection(testConnectionA.connectionId, dirtyIdA);

            const connectionIdToRemove = ConnectionStore.connections.get(0).connectionId;

            optmisticallyRemoveConnection(connectionIdToRemove, dirtyId);
            failToRemoveConnection(dirtyId);

            expect(ConnectionStore.connections.count()).toEqual(1);
            expect(ConnectionStore.connections.get(0).dirty).toBeFalsy();
        });
    });

    function optimisticallyAddConnection(connection) {
        const {sourceControl, targetControl, dirty} = connection;
        ConnectionActions.addConnectionOptimistic(sourceControl, targetControl, dirty);
        jasmine.clock().tick(jasmine.DEFAULT_TIMEOUT_INTERVAL);
    }

    function actuallyAddConnection(connectionId, dirty) {
        ConnectionActions.addConnectionCompleted(connectionId, dirty);
        jasmine.clock().tick(jasmine.DEFAULT_TIMEOUT_INTERVAL);
    }

    function failToAddConnection(dirty) {
        ConnectionActions.addConnectionFailed(dirty);
        jasmine.clock().tick(jasmine.DEFAULT_TIMEOUT_INTERVAL);
    }

    function optmisticallyRemoveConnection(connectionId, dirty) {
        ConnectionActions.removeConnectionOptimistic(connectionId, dirty);
        jasmine.clock().tick(jasmine.DEFAULT_TIMEOUT_INTERVAL);
    }

    function actuallyRemoveConnection(dirty) {
        ConnectionActions.removeConnectionCompleted(dirty);
        jasmine.clock().tick(jasmine.DEFAULT_TIMEOUT_INTERVAL);
    }

    function failToRemoveConnection(dirty) {
        ConnectionActions.removeConnectionFailed(dirty);
        jasmine.clock().tick(jasmine.DEFAULT_TIMEOUT_INTERVAL);
    }

});
