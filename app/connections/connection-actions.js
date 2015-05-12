import Reflux from 'reflux';
import shortId from 'shortid';

import ConnectionApiCalls from './connection-api-calls';
import LoggingActions from'../logging/logging-actions';
import LogLevels from'../logging/log-levels';

let ConnectionActions = Reflux.createActions({
    'addConnection': {children: ['optimistic', 'completed', 'failed']},
    'removeConnection': {children: ['optimistic', 'completed', 'failed']}
});

ConnectionActions.addConnection.listen(onAddConnection);
ConnectionActions.removeConnection.listen(onRemoveConnection);

function onAddConnection(sourceControl, targetControl) {
    const dirty = shortId.generate();
    const connectionId = shortId.generate();

    this.optimistic(sourceControl, targetControl, dirty);

    ConnectionApiCalls.putNewConnection(sourceControl.instanceId, targetControl.instanceId)
        .then(() => this.completed(connectionId, dirty))
        .catch(() => this.failed(dirty));
}

function onRemoveConnection(connectionId) {
    const dirty = shortId.generate();

    this.optimistic(connectionId, dirty);

    ConnectionApiCalls.putNewConnection(connectionId)
        .then(() => this.completed(dirty))
        .catch(() => this.failed(dirty));
}

export default ConnectionActions;
