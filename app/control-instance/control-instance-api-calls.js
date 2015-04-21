import BlueBirdPromise from 'bluebird';

class ControlInstanceApiCalls {
    putNewControl(typeId, name) {
        return new BlueBirdPromise((resolve, reject) => {
            setTimeout(() => resolve(), 1000);
        });
    }

    postRenamedControl(typeId, name) {
        return new BlueBirdPromise((resolve, reject) => {
            setTimeout(() => resolve(), 1000);
        });
    }

    postRemoveControl(instanceId) {
        return new BlueBirdPromise((resolve, reject) => {
            setTimeout(() => resolve(), 1000);
        });
    }
}

export default new ControlInstanceApiCalls;
