import BlueBirdPromise from 'bluebird';

class ControlInstanceApiCalls {
    putNewControl(typeId, name) {
        return new BlueBirdPromise((resolve, reject) => {
            setTimeout(() => resolve(), 500);
        });
    }

    postRenamedControl(typeId, name) {
        return new BlueBirdPromise((resolve, reject) => {
            setTimeout(() => resolve(), 500);
        });
    }

    postRemoveControl(instanceId) {
        return new BlueBirdPromise((resolve, reject) => {
            setTimeout(() => resolve(), 500);
        });
    }
}

export default new ControlInstanceApiCalls;
