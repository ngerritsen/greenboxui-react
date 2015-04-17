import React from 'react/addons';
import ControlInstanceAddTool from './control-instance-add-tool';
import ControlInstanceActions from './control-instance-actions';

const ReactTestUtils = React.addons.TestUtils;

describe('control instance add tool', () => {
    const dummyControl = { typeId: 'Valve', instanceId: '9874200', name: 'Valve 1' };

    let controlInstanceAddTool;

    beforeEach(() => {
        controlInstanceAddTool = ReactTestUtils.renderIntoDocument(
            <ControlInstanceAddTool/>
        );
    });

    it('adds a control', () => {
        const newName = 'New Control Name';

        spyOn(ControlInstanceActions, 'addControl');

        const submitButton = ReactTestUtils.findRenderedDOMComponentWithTag(controlInstanceAddTool, 'button');

        React.findDOMNode(controlInstanceAddTool.refs.controlNameInput).value = newName;
        ReactTestUtils.Simulate.click(submitButton);

        expect(ControlInstanceActions.addControl).toHaveBeenCalledWith('Pump', newName);
    });

    it('adds multiple controls if amount input is higher than 1', () => {
        const newName = 'New Control Name';
        const amount = 10;
        let addedControls = [];

        spyOn(ControlInstanceActions, 'addControl').and.callFake((type, name) => {
            addedControls.push(name);
        });

        const submitButton = ReactTestUtils.findRenderedDOMComponentWithTag(controlInstanceAddTool, 'button');

        React.findDOMNode(controlInstanceAddTool.refs.controlNameInput).value = newName;
        React.findDOMNode(controlInstanceAddTool.refs.controlAmountInput).value = amount;
        ReactTestUtils.Simulate.click(submitButton);

        expect(addedControls.length).toEqual(10);
        expect(addedControls[0]).toEqual(`${newName} 1`);
        expect(addedControls[9]).toEqual(`${newName} 10`);
    });

    it('removes whitespace from the control name when adding a control', () => {
        const newName = 'New Control Name';
        const whiteSpacedNewName = '  New Control Name  ';

        spyOn(ControlInstanceActions, 'addControl');

        const submitButton = ReactTestUtils.findRenderedDOMComponentWithTag(controlInstanceAddTool, 'button');

        React.findDOMNode(controlInstanceAddTool.refs.controlNameInput).value = whiteSpacedNewName;
        ReactTestUtils.Simulate.click(submitButton);

        expect(ControlInstanceActions.addControl).toHaveBeenCalledWith('Pump', newName);
    });

    it('does not add a control with an invalid name', () => {
        const invalidName = ' ';

        spyOn(ControlInstanceActions, 'addControl');

        const submitButton = ReactTestUtils.findRenderedDOMComponentWithTag(controlInstanceAddTool, 'button');

        React.findDOMNode(controlInstanceAddTool.refs.controlNameInput).value = invalidName;
        ReactTestUtils.Simulate.click(submitButton);

        expect(ControlInstanceActions.addControl).not.toHaveBeenCalled();
    });
});