import AltApp from '../core/alt-app';

class ConnectionActions {
    addConnection(sourceControl, targetControl) {
        this.dispatch({
            sourceControl: sourceControl,
            targetControl: targetControl
        });
    }

    removeConnection(connectionId) {
        this.dispatch({
            connectionId: connectionId
        });
    }
}

export default AltApp.createActions(ConnectionActions);
