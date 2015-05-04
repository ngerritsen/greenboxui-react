import BlueBirdPromise from 'bluebird';

class AlarmApiCalls {
    postResetAlarm(id) {
        return new BlueBirdPromise((resolve, reject) => {
            setTimeout(() => resolve(), 500);
        });
    }
}

export default new AlarmApiCalls;
