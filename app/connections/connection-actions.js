import AltApp from '../core/alt-app';
import shortId from 'shortid';
import ConnectionServerActions from './connection-server-actions';
import ConnectionApiCalls from './connection-api-calls';

class ConnectionActions {
    addConnection(sourceControl, targetControl) {
        const dirtyId = shortId.generate();
        const connectionId = shortId.generate();

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
        const dirtyId = shortId.generate();

        let request = ConnectionApiCalls.postRemoveConnection(connectionId);
        request.then(() => ConnectionServerActions.removeConnectionSucceeded(dirtyId));
        request.catch(() => ConnectionServerActions.removeConnectionFailed(dirtyId));

        this.dispatch({
            connectionId: connectionId,
            dirty: dirtyId

        });
    }
}

export default AltApp.createActions(ConnectionActions);
