import React from 'react/addons';
import Immutable from 'immutable';

import GridRow from '../shared/grid/grid-row';
import LoggingView from './logging-view';
import LogLevels from './log-levels';
import LoggingStore from './logging-store';
import Log from './log';

const ReactTestUtils = React.addons.TestUtils;

describe('logging view', () => {

    const dummyLogA = new Log({ level: LogLevels.info, message: 'Test log A', date: new Date() });
    const dummyLogB = new Log({ level: LogLevels.error, message: 'Test log B', date: new Date() });
    const dummyLogging = Immutable.List.of(dummyLogA, dummyLogB);

    let loggingView;

    beforeEach(() => {
        LoggingStore.logging = dummyLogging;
        loggingView = ReactTestUtils.renderIntoDocument(
            <LoggingView/>
        );
    });

    afterEach(() => {
        loggingView.componentWillUnmount();
        React.unmountComponentAtNode(document.body);
    });

    it('gets initial logging state and shows loggings', () => {
        const rows = ReactTestUtils.scryRenderedComponentsWithType(loggingView, GridRow);

        expect(loggingView.state.logging).toEqual(dummyLogging);
        expect(rows.length).toEqual(2);
    });

    it('filters by log level', () => {
        loggingView._handleToggleError();
        const rows = ReactTestUtils.scryRenderedComponentsWithType(loggingView, GridRow);

        expect(rows.length).toEqual(1);
    });
});