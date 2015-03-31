import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import HelloWorld from './HelloWorld.react';

describe('Hello World Test', () => {
    it('Check if renders Hello World', () => {
        var helloWorld = ReactTestUtils.renderIntoDocument(<HelloWorld/>);
        expect(helloWorld.state.message).toBe('Hello World!');
    });
});