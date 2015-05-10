import Reflux from 'reflux';
import shortId from 'shortid';
import ConnectionApiCalls from './connection-api-calls';
import LoggingActions from'../logging/logging-actions';
import LogLevels from'../logging/log-levels';

let ControlInstanceActions = Reflux.createActions({
    'addConnection': {children: ['optimistic', 'completed', 'failed']},
    'removeControl': {children: ['optimistic', 'completed', 'failed']}
});

ControlInstanceActions.addConnection.listen((sourceControl, targetControl) => {
    const dirty = shortId.generate();
    const connectionId = shortId.generate();

    this.optimistic(sourceControl, targetControl, dirty);
    let request = ConnectionApiCalls.putNewConnection(sourceControl.instanceId, targetControl.instanceId);
    request.then(() => ConnectionServerActions.addConnectionSucceeded(connectionId, dirty));
    request.then(() => ConnectionServerActions.addConnectionFailed(dirty));
});

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

export default ConnectionActions;
