import TimeStore from './time-store';

describe('control instance store', () => {
    it('updates time automatically', () => {
        const oldTime = TimeStore.time;

        setTimeout(() => {
            const newTime = TimeStore.time;
            expect(oldTime).not.toEqual(newTime);
        }, 1100);
    });
});
