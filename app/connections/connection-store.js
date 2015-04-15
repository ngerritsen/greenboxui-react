import AltApp from '../core/alt-app';
import ConnectionActions from './connection-actions';

class ConnectionStore {
    constructor() {
        this.connections = [];

        this.bindAction(ConnectionActions.addConnection, this.onConnectionAdded);
        this.bindAction(ConnectionActions.removeConnection, this.onConnectionRemoved);

        this.exportPublicMethods({
            _getNewInstanceId: this._getNewInstanceId
        });
    }

    onConnectionAdded(connection) {
        if (connection && connection.sourceControl && connection.targetControl) {
            connection.connectionId = this._getNewInstanceId();
            this.connections.push(connection);
        }
    }

    onConnectionRemoved(payload) {
        if (payload.connectionId) {
            const connectionIdToRemove = payload.connectionId;
            this.connections = this.connections.filter((connection) => connection.connectionId !== connectionIdToRemove);
        }
    }

    _getNewInstanceId() {
        return Math.round((Math.random() * 1000000))
    }
}

export default AltApp.createStore(ConnectionStore);
