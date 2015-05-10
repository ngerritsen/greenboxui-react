import Reflux from 'reflux';
import shortId from 'shortid';
import ConnectionApiCalls from './connection-api-calls';
import LoggingActions from'../logging/logging-actions';
import LogLevels from'../logging/log-levels';

let ConnectionActions = Reflux.createActions({
    'addConnection': {children: ['optimistic', 'completed', 'failed']},
    'removeConnection': {children: ['optimistic', 'completed', 'failed']}
});

ConnectionActions.addConnection.listen((sourceControl, targetControl) => {
    const dirty = shortId.generate();
    const connectionId = shortId.generate();

    this.optimistic(sourceControl, targetControl, dirty);
    let request = ConnectionApiCalls.putNewConnection(sourceControl.instanceId, targetControl.instanceId);
    request.then(() => this.completed(connectionId, dirty));
    request.then(() => this.failed(dirty));
});

ConnectionActions.removeConnection.listen((connectionId) => {
    const dirty = shortId.generate();

    this.optimistic(connectionId, dirty);
    let request = ConnectionApiCalls.putNewConnection(connectionId);
    request.then(() => this.completed(dirty));
    request.then(() => this.failed(dirty));
});

export default ConnectionActions;
