import Immutable from 'immutable';

import LogLevels from './log-levels';
import LoggingStore from './logging-store';
import LoggingActions from './logging-actions';

describe('logging store', () => {

    const dummyMessageA = 'This is a log.';
    const dummyMessageB = 'This is second log.';

    beforeEach(() => {
        LoggingStore.logging = Immutable.List();
        jasmine.clock().install()
    });

    afterEach(() => {
        LoggingStore.logging = Immutable.List();
        jasmine.clock().uninstall()
    });

    it('adds a log on log', () => {
        log(LogLevels.info, dummyMessageA);

        expect(LoggingStore.logging.count()).toEqual(1);
        expect(LoggingStore.logging.get(0).message).toEqual(dummyMessageA);
        expect(LoggingStore.logging.get(0).level).toEqual(LogLevels.info);
    });

    it('adds multiple logs', () => {
        log(LogLevels.info, dummyMessageA);
        log(LogLevels.error, dummyMessageB);

        expect(LoggingStore.logging.count()).toEqual(2);
    });

    it('removes a log', () => {
        log(LogLevels.info, dummyMessageA);

        const logId = LoggingStore.logging.get(0).id;

        removeLog(logId);

        expect(LoggingStore.logging.count()).toEqual(0);
    });

    it('flushes the logging', () => {
        log(LogLevels.info, dummyMessageA);
        log(LogLevels.error, dummyMessageB);
        flushLogging();

        expect(LoggingStore.logging.count()).toEqual(0);
    });

    function log(level, message) {
        LoggingActions.log(level, message);
        jasmine.clock().tick(jasmine.DEFAULT_TIMEOUT_INTERVAL);
    }

    function removeLog(id) {
        LoggingActions.removeLog(id);
        jasmine.clock().tick(jasmine.DEFAULT_TIMEOUT_INTERVAL);
    }

    function flushLogging() {
        LoggingActions.flushLogging();
        jasmine.clock().tick(jasmine.DEFAULT_TIMEOUT_INTERVAL);
    }
});