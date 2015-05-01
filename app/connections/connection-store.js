import AltApp from '../core/alt-app';
import Immutable from 'immutable';
import ConnectionActions from './connection-actions';
import ConnectionServerActions from './connection-server-actions';
import Connection from './connection';

class ConnectionStore {
    constructor() {
        this.connections = Immutable.List();

        this.bindAction(ConnectionActions.addConnection, this.onAddConnectionOptimistic);
        this.bindAction(ConnectionServerActions.addConnectionSucceeded, this.onAddConnectionSucceeded);
        this.bindAction(ConnectionServerActions.addConnectionFailed, this.onAddConnectionFailed);

        this.bindAction(ConnectionActions.removeConnection, this.onRemoveConnectionOptimistic);
        this.bindAction(ConnectionServerActions.removeConnectionSucceeded, this.onRemoveConnectionSucceeded);
        this.bindAction(ConnectionServerActions.removeConnectionFailed, this.onRemoveConnectionFailed);

        this.exportPublicMethods({
            connectionExists: this.connectionExists,
            _connectionExists: this._connectionExists
        });

        this.on('init', this.bootstrap);
    }

    bootstrap() {
        // Prevent alt app flush from converting list to regular js array, sorry guys..
        if(! Immutable.List.isList(this.connections)) {
            this.connections = Immutable.List(this.connections);
        }
    }

    onAddConnectionOptimistic(payload) {
        if(payload && payload.sourceControl && payload.targetControl) {
            const newConnection = new Connection({
                sourceControlInstanceId: payload.sourceControl.instanceId,
                sourceControlTypeId: payload.sourceControl.typeId,
                sourceControlTypeName: payload.sourceControl.typeName,
                sourceControlName: payload.sourceControl.name,
                targetControlInstanceId: payload.targetControl.instanceId,
                targetControlTypeId: payload.targetControl.typeId,
                targetControlTypeName: payload.targetControl.typeName,
                targetControlName: payload.targetControl.name,
                dirty: payload.dirty
            });
            if(!this._connectionExists(newConnection.sourceControlInstanceId, newConnection.targetControlInstanceId)) {
                this.connections = this.connections.push(newConnection);
            }
        }
    }

    onAddConnectionSucceeded(payload) {
        const {connectionId, clean} = payload;
        this.connections = this.connections.map((connection) => {
            if(connection.dirty === clean) {
                connection = connection.set('connectionId', connectionId);
                connection = connection.remove('dirty');
            }
            return connection;
        });
    }

    onAddConnectionFailed(payload) {
        this.connections = this.connections.filter((connection) => connection.dirty !== payload.clean);
    }

    onRemoveConnectionOptimistic(payload) {
        const {connectionId, dirty} = payload;
        this.connections = this.connections.map((connection) => {
            if(connection.connectionId === connectionId) {
                connection = connection.set('dirty', dirty);
            }
            return connection;
        });
    }

    onRemoveConnectionSucceeded(payload) {
        this.connections = this.connections.filter((connection) => connection.dirty !== payload.clean);
    }

    onRemoveConnectionFailed(payload) {
        this.connections = this.connections.map((connection) => {
            if(connection.dirty === payload.clean) {
                connection = connection.remove('dirty');
            }
            return connection;
        });
    }

    _connectionExists(sourceInstanceId, targetInstanceId) {
        return this.connections.find((connection) => connection.sourceControlInstanceId === sourceInstanceId && connection.targetControlInstanceId === targetInstanceId);
    }

    connectionExists(sourceInstanceId, targetInstanceId) {
        return this.getState().connections.find((connection) => connection.sourceControlInstanceId === sourceInstanceId && connection.targetControlInstanceId === targetInstanceId);
    }
}

export default AltApp.createStore(ConnectionStore, 'ConnectionStore');
