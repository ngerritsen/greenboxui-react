import AltApp from '../../core/alt-app';
import TimeActions from './time-actions';
import TimeStore from './time-store';

describe('control instance store', () => {
    const updateTimeAction = TimeActions.UPDATE_TIME;

    afterEach(() => AltApp.flush());

    it('updates time', () => {
        const oldTime = TimeStore.getState().time;
        const newTime = new Date();
        updateTime(new Date());

        expect(oldTime).not.toEqual(newTime);
    });

    it('updates time automatically', () => {
        const oldTime = TimeStore.getState().time;

        setTimeout(() => {
            const newTime = TimeStore.getState().time;
            expect(oldTime).not.toEqual(newTime);
        }, 1100);
    });

    function updateTime(newTime) {
        AltApp.dispatcher.dispatch({ action: updateTimeAction, data: { time: newTime } });
    }
});