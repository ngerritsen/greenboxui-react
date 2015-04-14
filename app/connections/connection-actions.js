import AltApp from '../core/alt-app';

class ConnectionActions {
    addConnection(sourceControl, targetControl) {
        this.dispatch({
            sourceControl: sourceControl,
            targetControl: targetControl
        });
    }

    removeConnection(connection) {
        this.dispatch({
            connection: connection
        });
    }
}

export default AltApp.createActions(ConnectionActions);
