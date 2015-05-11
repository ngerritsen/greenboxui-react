import AltApp from '../../core/alt-app';
import TimeStore from './time-store';

xdescribe('control instance store', () => {
    const updateTimeAction = TimeActions.UPDATE_TIME;

    afterEach(() => AltApp.flush());

    it('updates time automatically', () => {
        const oldTime = TimeStore.time;

        setTimeout(() => {
            const newTime = TimeStore.time;
            expect(oldTime).not.toEqual(newTime);
        }, 1100);
    });
});
