import AltApp from '../core/alt-app';

class ConnectionServerActions {
    addConnectionSucceeded(dirtyId, connectionId) {
        this.dispatch({
            connectionId: connectionId,
            clean: dirtyId
        });
    }

    addConnectionFailed(dirtyId) {
        this.dispatch({
            clean: dirtyId
        });
    }

    removeConnectionSucceeded(dirtyId) {
        this.dispatch({
            clean: dirtyId
        });
    }

    removeConnectionFailed(dirtyId) {
        this.dispatch({
            clean: dirtyId
        });
    }
}

export default AltApp.createActions(ConnectionServerActions);
