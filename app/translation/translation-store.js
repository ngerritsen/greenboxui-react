import AltApp from '../../core/alt-app';

class TimeActions {
    updateTime(newTime) {
        this.dispatch({
            time: newTime
        });
    }
}

export default AltApp.createActions(TimeActions);
