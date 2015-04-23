import BlueBirdPromise from 'bluebird';

class ConnectionApiCalls {
    putNewConnection(sourceControl, targetControl) {
        return new BlueBirdPromise((resolve, reject) => {
            setTimeout(() => resolve(), 500);
        });
    }

    postRemoveConnection(connectionId) {
        return new BlueBirdPromise((resolve, reject) => {
            setTimeout(() => resolve(), 500);
        });
    }
}

export default new ConnectionApiCalls;
