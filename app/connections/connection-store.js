import AltApp from '../core/alt-app';
import ConnectionActions from './connection-actions';
import ConnectionServerActions from './connection-server-actions';
import Connection from './connection';
import Immutable from 'immutable';

class ConnectionStore {
    constructor() {
        this.connections = Immutable.List();

        this.bindAction(ConnectionActions.addConnection, this.onConnectionOptimisticallyAdded);
        this.bindAction(ConnectionServerActions.addConnectionSucceeded, this.onConnectionSuccessfullyAdded);
        this.bindAction(ConnectionServerActions.addConnectionFailed, this.onConnectionUnsuccessfullyAdded);

        this.bindAction(ConnectionActions.removeConnection, this.onConnectionOptimisticallyRemoved);
        this.bindAction(ConnectionServerActions.removeConnectionSucceeded, this.onConnectionSuccessfullyRemoved);
        this.bindAction(ConnectionServerActions.removeConnectionFailed, this.onConnectionUnsuccessfullyRemoved);

        this.on('init', this.bootstrap);
        this.on('bootstrap', this.bootstrap);
    }

    bootstrap() {
        // Prevent alt app flush from converting list to regular js array, sorry guys..
        if(! Immutable.List.isList(this.connections)) {
            this.connections = Immutable.List(this.connections);
        }
    }

    onConnectionOptimisticallyAdded(payload) {
        if(payload && payload.sourceControl && payload.targetControl) {
            const newConnection = new Connection({
                sourceControlInstanceId: payload.sourceControl.instanceId,
                sourceControlTypeId: payload.sourceControl.typeId,
                sourceControlName: payload.sourceControl.name,
                targetControlInstanceId: payload.targetControl.instanceId,
                targetControlTypeId: payload.targetControl.typeId,
                targetControlName: payload.targetControl.name,
                dirty: payload.dirty
            });
            this.connections = this.connections.push(newConnection);
        }
    }

    onConnectionSuccessfullyAdded(payload) {
        this.connections = this.connections.map((connection) => {
            if(connection.dirty === payload.clean) {
                connection = connection.set('connectionId', payload.connectionId);
                connection = connection.remove('dirty');
            }
            return connection;
        });
    }

    onConnectionUnsuccessfullyAdded(payload) {
        this.connections = this.connections.filter((connection) => connection.dirty !== payload.clean);
    }

    onConnectionOptimisticallyRemoved(payload) {
        this.connections = this.connections.map((connection) => {
            if(connection.connectionId === payload.connectionId) {
                connection = connection.set('dirty', payload.dirty);
            }
            return connection;
        });
    }

    onConnectionSuccessfullyRemoved(payload) {
        this.connections = this.connections.filter((connection) => connection.dirty !== payload.clean);
    }

    onConnectionUnsuccessfullyRemoved(payload) {
        this.connections = this.connections.map((connection) => {
            if(connection.connectionId === payload.connectionId) {
                connection = connection.remove('dirty');
            }
            return connection;
        });
    }
}

export default AltApp.createStore(ConnectionStore, 'ConnectionStore');
