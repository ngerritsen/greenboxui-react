import AltApp from '../core/alt-app';
import ConnectionServerActions from './connection-server-actions';
import ConnectionApiCalls from './connection-api-calls';

class ConnectionActions {
    addConnection(sourceControl, targetControl) {
        const dirtyId = getNewRandomId();
        const connectionId = getNewRandomId();

        let request = ConnectionApiCalls.putNewConnection(sourceControl.instanceId, targetControl.instanceId);
        request.then(() => ConnectionServerActions.addConnectionSucceeded(dirtyId, connectionId));
        request.then(() => ConnectionServerActions.addConnectionFailed(dirtyId));

        this.dispatch({
            sourceControl: sourceControl,
            targetControl: targetControl,
            dirty: dirtyId
        });
    }

    removeConnection(connectionId) {
        const dirtyId = getNewRandomId();

        let request = ConnectionApiCalls.postRemoveConnection(connectionId);
        request.then(() => ConnectionServerActions.removeConnectionSucceeded(dirtyId));
        request.catch(() => ConnectionServerActions.removeConnectionFailed(dirtyId));

        this.dispatch({
            connectionId: connectionId,
            dirty: dirtyId

        });
    }
}

function getNewRandomId() {
    return Math.round((Math.random() * 1000000))
}

export default AltApp.createActions(ConnectionActions);
