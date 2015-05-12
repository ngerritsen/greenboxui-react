import Immutable from 'immutable';
import Reflux from 'reflux';

import Connection from './connection';
import ConnectionActions from './connection-actions';

export default Reflux.createStore({
    init() {
        this.connections = Immutable.List();

        this.listenToMany(ConnectionActions);
    },
    onAddConnectionOptimistic(sourceControl, targetControl, dirty) {
        if(targetControl && sourceControl) {
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
        }
    },
    onAddConnectionCompleted(connectionId, dirty) {
        this.connections = this.connections.map((connection) => {
            if(connection.dirty === dirty) {
                connection = connection.set('connectionId', connectionId);
                connection = connection.remove('dirty');
            }
            return connection;
        });
        this.trigger(this.connections);
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
        this.trigger(this.connections);
    },

    onRemoveConnectionCompleted(dirty) {
        this.connections = this.connections.filter((connection) => connection.dirty !== dirty);
        this.trigger(this.connections);
    },

    onRemoveConnectionFailed(dirty) {
        this.connections = this.connections.map((connection) => {
            if(connection.dirty === dirty) {
                connection = connection.remove('dirty');
            }
            return connection;
        });
        this.trigger(this.connections);
    },
    connectionExists(sourceInstanceId, targetInstanceId) {
        return this.connections.find((connection) => connection.sourceControlInstanceId === sourceInstanceId && connection.targetControlInstanceId === targetInstanceId);
    }
});
