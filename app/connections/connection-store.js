import Reflux from 'reflux';
import Immutable from 'immutable';
import ConnectionActions from './connection-actions';
import Connection from './connection';

export default Reflux.createStore({
    init() {
        this.connections = Immutable.List();

        this.listenToMany(ConnectionActions);
    },
    onAddConnectionOptimistic(sourceControl, targetControl, dirty) {
        const newConnection = new Connection({
            sourceControlInstanceId: sourceControl.instanceId,
            sourceControlTypeId: sourceControl.typeId,
            sourceControlTypeName: sourceControl.typeName,
            sourceControlName: sourceControl.name,
            targetControlInstanceId: targetControl.instanceId,
            targetControlTypeId: targetControl.typeId,
            targetControlTypeName: targetControl.typeName,
            targetControlName: targetControl.name,
            dirty: dirty
        });
        if(!this.connectionExists(newConnection.sourceControlInstanceId, newConnection.targetControlInstanceId)) {
            this.connections = this.connections.push(newConnection);
        }
        this.trigger(this.connections);
    },
    onAddConnectionCompleted(connectionId, dirty) {
        this.connections = this.connections.map((connection) => {
            if(connection.dirty === dirty) {
                connection = connection.set('connectionId', connectionId);
                connection = connection.remove('dirty');
            }
            return connection;
        });
    },

    onAddConnectionFailed(dirty) {
        this.connections = this.connections.filter((connection) => connection.dirty !== dirty);
    },

    onRemoveConnectionOptimistic(connectionId, dirty) {
        this.connections = this.connections.map((connection) => {
            if(connection.connectionId === connectionId) {
                connection = connection.set('dirty', dirty);
            }
            return connection;
        });
    },

    onRemoveConnectionCompleted(dirty) {
        this.connections = this.connections.filter((connection) => connection.dirty !== dirty);
    },

    onRemoveConnectionFailed(dirty) {
        this.connections = this.connections.map((connection) => {
            if(connection.dirty === dirty) {
                connection = connection.remove('dirty');
            }
            return connection;
        });
    },
    connectionExists(sourceInstanceId, targetInstanceId) {
        return this.connections.find((connection) => connection.sourceControlInstanceId === sourceInstanceId && connection.targetControlInstanceId === targetInstanceId);
    }
});
