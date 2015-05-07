import AltApp from '../../core/alt-app';
import TimeActions from './time-actions';

class TimeStore {
    constructor() {
        this.time = new Date();

        this.bindAction(TimeActions.updateTime, this.onTimeChanged);

        this._refreshTime();
    }

    onTimeChanged(payload) {
        if(payload.time) {
            this.time = payload.time;
        }
    }
    //Comment

    _refreshTime() {
        setInterval(() => {
            const newTime = new Date();
            TimeActions.updateTime(newTime);
        }, 1000);
    }
}

export default AltApp.createStore(TimeStore, 'TimeStore');
