import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import HelloWorld from './HelloWorld.react';
import HelloWorldStore from '../stores/HelloWorldStore';

describe('Hello World Test', () => {
    let testMessage = 'TestMessage';

    beforeEach(() => {
        spyOn(HelloWorldStore, 'getMessage').and.returnValue(testMessage);

    });

    it('Check if renders Loading at Initialization', () => {
        var helloWorld = ReactTestUtils.renderIntoDocument(<HelloWorld/>);
        expect(helloWorld.state.message).toBe('Loading..');
    });

    it('Check if submit changes message', () => {
        var helloWorld = ReactTestUtils.renderIntoDocument(<HelloWorld/>);
        helloWorld._onChange();
        expect(helloWorld.state.message).toBe(testMessage);
    });
});