import BlueBirdPromise from 'bluebird';

class ParameterApiCalls {
    postParameterValue(controlInstanceId, parameterId, newValue) {
        return new BlueBirdPromise((resolve, reject) => {
            setTimeout(() => resolve(), 500);
        });
    }

    getParameters(parameters) {
        return new BlueBirdPromise((resolve, reject) => {
            setTimeout(() => resolve(), 500);
        });
    }
}

export default new ParameterApiCalls;