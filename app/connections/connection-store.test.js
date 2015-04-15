import AltApp from '../core/alt-app';
import ConnectionStore from './connection-store';
import ConnectionActions from './connection-actions';

describe('connection store', () => {
    const addConnectionAction = ConnectionActions.ADD_CONNECTION;
    const removeConnectionAction = ConnectionActions.REMOVE_CONNECTION;

    const testConnectionA = {
        connectionId: '58952352',
        sourceControl: { typeId: 'Pump', connectionId: '0874134', name: 'Pump 1' },
        targetControl: { typeId: 'Valve', connectionId: '138134', name: 'Valve 1' }
    };
    const testConnectionB = {
        connectionId: '89f304g3',
        sourceControl: { typeId: 'Pump', connectionId: '0874134', name: 'Pump 1' },
        targetControl: { typeId: 'Valve', connectionId: '345254', name: 'Valve 2' }
    };

    afterEach(() => AltApp.flush());

    describe('add a connection tests', () => {
        it('adds a connection', () => {
            addConnection(testConnectionA);

            expect(ConnectionStore.getState().connections.length).toEqual(1);
        });

        it('adds multiple connections', () => {
            addConnection(testConnectionA);
            addConnection(testConnectionB);

            expect(ConnectionStore.getState().connections.length).toEqual(2);
        });

        it('adds the right data to the connection', () => {
            addConnection(testConnectionA);

            expect(ConnectionStore.getState().connections[0].typeId).toEqual(testConnectionA.typeId);
            expect(ConnectionStore.getState().connections[0].name).toEqual(testConnectionA.name);
        });

        it('generates an connection id when adding a connection', () => {
            addConnection(testConnectionA);

            expect(ConnectionStore.getState().connections[0].connectionId).toBeDefined();
        });

        it('generates different connection ids when adding connections', () => {
            addConnection(testConnectionA);
            addConnection(testConnectionB);

            expect(ConnectionStore.getState().connections[0].connectionId)
                .not.toEqual(ConnectionStore.getState().connections[1].connectionId);
        });

        it('ignores invalid connections', () => {
            const invalidConnection1 = {sourceControl: {}};
            const invalidConnection2 = {targetControl: {}};

            addConnection(invalidConnection1);
            addConnection(invalidConnection2);

            expect(ConnectionStore.getState().connections.length).toEqual(0);
        });
    });

    describe('remove a connection tests', () => {
        it('removes a connection', () => {
            addConnection(testConnectionA);

            const connectionIdToRemove = ConnectionStore.getState().connections[0].connectionId;

            removeConnection(connectionIdToRemove);

            expect(ConnectionStore.getState().connections.length).toEqual(0);
        });

        it('removes one and the right connection from multiple connections', () => {
            addConnection(testConnectionA);
            addConnection(testConnectionB);

            const connectionIdA = ConnectionStore.getState().connections[0].connectionId;
            const connectionIdB = ConnectionStore.getState().connections[1].connectionId;

            removeConnection(connectionIdA);

            expect(ConnectionStore.getState().connections.length).toEqual(1);
            expect(ConnectionStore.getState().connections[0].connectionId).toEqual(connectionIdB);
        });
    });


    function addConnection(connection) {
        AltApp.dispatcher.dispatch({ action: addConnectionAction, data: connection });
    }

    function removeConnection(connectionId) {
        AltApp.dispatcher.dispatch({ action: removeConnectionAction, data: { connectionId: connectionId } });
    }
});
