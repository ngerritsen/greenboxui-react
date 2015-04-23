import AltApp from '../core/alt-app';
import ConnectionActions from './connection-actions';
import Connection from './connection';
import Immutable from 'immutable';

class ConnectionStore {
    constructor() {
        this.connections = Immutable.List();

        this.bindAction(ConnectionActions.addConnection, this.onConnectionAdded);
        this.bindAction(ConnectionActions.removeConnection, this.onConnectionRemoved);

        this.exportPublicMethods({
            _getNewInstanceId: this._getNewInstanceId
        });

        this.on('init', this.bootstrap);
        this.on('bootstrap', this.bootstrap);
    }

    bootstrap() {
        // Prevent alt app flush from converting list to regular js array, sorry guys..
        if (! Immutable.List.isList(this.connections)) {
            this.connections = Immutable.List(this.connections);
        }
    }

    onConnectionAdded(payload) {
        if (payload && payload.sourceControl && payload.targetControl) {
            const newConnection = new Connection({
                connectionId: this._getNewInstanceId(),
                sourceControlInstanceId: payload.sourceControl.instanceId,
                sourceControlTypeId: payload.sourceControl.typeId,
                sourceControlName: payload.sourceControl.name,
                targetControlInstanceId: payload.targetControl.instanceId,
                targetControlTypeId: payload.targetControl.typeId,
                targetControlName: payload.targetControl.name
            });
            this.connections = this.connections.push(newConnection);
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

export default AltApp.createStore(ConnectionStore, 'ConnectionStore');
