import AltApp from '../core/alt-app';
import LogLevels from './log-levels';
import LoggingStore from './logging-store';
import LoggingActions from './logging-actions';

describe('logging store', () => {

    const dummyMessageA = 'This is a log.';
    const dummyMessageB = 'This is second log.';

    afterEach(() => AltApp.flush());

    it('adds a log on log', () => {
        log(LogLevels.info, dummyMessageA);

        expect(LoggingStore.getState().logging.count()).toEqual(1);
        expect(LoggingStore.getState().logging.get(0).message).toEqual(dummyMessageA);
        expect(LoggingStore.getState().logging.get(0).level).toEqual(LogLevels.info);
    });

    it('adds multiple logs', () => {
        log(LogLevels.info, dummyMessageA);
        log(LogLevels.error, dummyMessageB);

        expect(LoggingStore.getState().logging.count()).toEqual(2);
    });

    function log(severity, message) {
        AltApp.dispatcher.dispatch({
            action: LoggingActions.LOG,
            data: { severity: severity, message: message }
        });
    }
});