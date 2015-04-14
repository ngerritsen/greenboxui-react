import AltApp from '../core/alt-app';
import ConnectionActions from './connection-actions';

class ConnectionStore {
    constructor() {
        this.connections = [];

        this.bindAction(ConnectionActions.addConnection, this.onConnectionAdded);
        this.bindAction(ConnectionActions.removeConnection, this.onConnectionRemoved);
    }

    onConnectionAdded(connection) {
        if (connection) {
            this.connections.push(connection);
        }
    }

    onConnectionRemoved(payload) {
        if (payload.connection) {
            const connectionToRemove = payload.connection;
            this.connections = this.connections.filter((connection) => connection !== connectionToRemove);
        }
    }
}

export default AltApp.createStore(ConnectionStore);
