import shortId from 'shortid';
import Immutable from 'immutable';
import ConnectionStore from './connection-store';
import ConnectionActions from './connection-actions';

describe('connection store', () => {
    const dirtyA = shortId.generate();
    const dirtyB = shortId.generate();

    const typeIdA = shortId.generate();
    const typeIdB = shortId.generate();

    const dummyControlA = { instanceId: shortId.generate(), typeId: typeIdA, name: 'Pump 1' };
    const dummyControlB = { instanceId: shortId.generate(), typeId: typeIdB, name: 'Valve 1' };
    const dummyControlC = { instanceId: shortId.generate(), typeId: typeIdB, name: 'Valve 1' };

    const testConnectionA = {
        connectionId: shortId.generate(),
        sourceControl: dummyControlA,
        targetControl: dummyControlB,
        dirty: dirtyA
    };
    const testConnectionB = {
        connectionId: shortId.generate(),
        sourceControl: dummyControlA,
        targetControl: dummyControlC,
        dirty: dirtyB
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
            addConnectionOptimistic(testConnectionA);

            expect(ConnectionStore.connections.count()).toEqual(1);
            expect(ConnectionStore.connections.get(0).dirty).toEqual(testConnectionA.dirty);
        });

        it('adds connection actually', () => {
            addConnectionOptimistic(testConnectionA);
            addConnectionCompleted(testConnectionA.connectionId, dirtyA);

            expect(ConnectionStore.connections.count()).toEqual(1);
            expect(ConnectionStore.connections.get(0).dirty).toBeFalsy();
            expect(ConnectionStore.connections.get(0).connectionId).toEqual(testConnectionA.connectionId);
        });

        it('adds multiple connections actually', () => {
            addConnectionOptimistic(testConnectionA);
            addConnectionOptimistic(testConnectionB);
            addConnectionCompleted(testConnectionA.connectionId, dirtyA);
            addConnectionCompleted(testConnectionB.connectionId, dirtyB);

            expect(ConnectionStore.connections.count()).toEqual(2);
            expect(ConnectionStore.connections.get(0).dirty).toBeFalsy();
            expect(ConnectionStore.connections.get(0).connectionId).toEqual(testConnectionA.connectionId);
            expect(ConnectionStore.connections.get(1).dirty).toBeFalsy();
            expect(ConnectionStore.connections.get(1).connectionId).toEqual(testConnectionB.connectionId);
        });

        it('ignores invalid connections', () => {
            const invalidConnection1 = {sourceControl: {}};
            const invalidConnection2 = {targetControl: {}};

            addConnectionOptimistic(invalidConnection1);
            addConnectionOptimistic(invalidConnection2);

            expect(ConnectionStore.connections.count()).toEqual(0);
        });

        it('cancels addition of a connection if addition failed', () => {
            addConnectionOptimistic(testConnectionA);
            addConnectionFailed(dirtyA);

            expect(ConnectionStore.connections.count()).toEqual(0);
        });

        it('does not add an existing connection', () => {
            addConnectionOptimistic(testConnectionA);
            addConnectionOptimistic(testConnectionA);

            expect(ConnectionStore.connections.count()).toEqual(1);
        });
    });

    describe('remove a connection tests', () => {
        it('optimistically removes a connection', () => {
            const dirty = shortId.generate();

            addConnectionOptimistic(testConnectionA);
            addConnectionCompleted(testConnectionA.connectionId, dirtyA);

            const connectionIdToRemove = ConnectionStore.connections.get(0).connectionId;

            removeConnectionOptimistic(connectionIdToRemove, dirty);

            expect(ConnectionStore.connections.count()).toEqual(1);
            expect(ConnectionStore.connections.get(0).dirty).toEqual(dirty);
        });

        it('actually removes a connection', () => {
            const dirty = shortId.generate();

            addConnectionOptimistic(testConnectionA);
            addConnectionCompleted(testConnectionA.connectionId, dirtyA);

            const connectionIdToRemove = ConnectionStore.connections.get(0).connectionId;

            removeConnectionOptimistic(connectionIdToRemove, dirty);
            removeConnectionCompleted(dirty);

            expect(ConnectionStore.connections.count()).toEqual(0);
        });

        it('removes one and the right connection from multiple connections', () => {
            const dirty = shortId.generate();

            addConnectionOptimistic(testConnectionA);
            addConnectionCompleted(testConnectionA.connectionId, dirtyA);

            addConnectionOptimistic(testConnectionB);
            addConnectionCompleted(testConnectionB.connectionId, dirtyB);

            const connectionIdA = ConnectionStore.connections.get(0).connectionId;
            const connectionIdB = ConnectionStore.connections.get(1).connectionId;

            removeConnectionOptimistic(connectionIdA, dirty);
            removeConnectionCompleted(dirty);

            expect(ConnectionStore.connections.count()).toEqual(1);
            expect(ConnectionStore.connections.get(0).connectionId).toEqual(connectionIdB);
        });

        it('cancels removal of a connection if removal failed', () => {
            const dirty = shortId.generate();

            addConnectionOptimistic(testConnectionA);
            addConnectionCompleted(testConnectionA.connectionId, dirtyA);

            const connectionIdToRemove = ConnectionStore.connections.get(0).connectionId;

            removeConnectionOptimistic(connectionIdToRemove, dirty);
            removeConnectionFailed(dirty);

            expect(ConnectionStore.connections.count()).toEqual(1);
            expect(ConnectionStore.connections.get(0).dirty).toBeFalsy();
        });
    });

    function addConnectionOptimistic(connection) {
        const {sourceControl, targetControl, dirty} = connection;
        ConnectionActions.addConnection.optimistic(sourceControl, targetControl, dirty);
        jasmine.clock().tick(jasmine.DEFAULT_TIMEOUT_INTERVAL);
    }

    function addConnectionCompleted(connectionId, dirty) {
        ConnectionActions.addConnection.completed(connectionId, dirty);
        jasmine.clock().tick(jasmine.DEFAULT_TIMEOUT_INTERVAL);
    }

    function addConnectionFailed(dirty) {
        ConnectionActions.addConnection.failed(dirty);
        jasmine.clock().tick(jasmine.DEFAULT_TIMEOUT_INTERVAL);
    }

    function removeConnectionOptimistic(connectionId, dirty) {
        ConnectionActions.removeConnection.optimistic(connectionId, dirty);
        jasmine.clock().tick(jasmine.DEFAULT_TIMEOUT_INTERVAL);
    }

    function removeConnectionCompleted(dirty) {
        ConnectionActions.removeConnection.completed(dirty);
        jasmine.clock().tick(jasmine.DEFAULT_TIMEOUT_INTERVAL);
    }

    function removeConnectionFailed(dirty) {
        ConnectionActions.removeConnection.failed(dirty);
        jasmine.clock().tick(jasmine.DEFAULT_TIMEOUT_INTERVAL);
    }

});
