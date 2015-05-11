import React from 'react/addons';
import Time from './time';

const ReactTestUtils = React.addons.TestUtils;

describe('time', () => {
    let time;

    beforeEach(() => {
        time = ReactTestUtils.renderIntoDocument(
            <Time/>
        );
    });

    afterEach(() => {
        time.componentWillUnmount();
        React.unmountComponentAtNode(document.body);
    });

    it('listens to the time store', () => {
        let oldTime = time.state.time;
        setTimeout(() => {
            let newTime = time.state.time;
            expect(oldTime).not.toEqual(newTime);
        }, 1100);
    });
});