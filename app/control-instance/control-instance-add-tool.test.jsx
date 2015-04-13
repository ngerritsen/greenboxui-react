import React from 'react/addons';
import ControlInstanceAddTool from './control-instance-add-tool';
import ControlInstanceActions from './control-instance-actions';

const ReactTestUtils = React.addons.TestUtils;

describe('control instance delete cell tests', () => {
    const dummyControl = { typeId: 'Valve', instanceId: '9874200', name: 'Valve 1' };

    let controlInstanceAddTool;

    beforeEach(() => {
        controlInstanceAddTool = ReactTestUtils.renderIntoDocument(
            <ControlInstanceAddTool context={dummyControl}/>
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