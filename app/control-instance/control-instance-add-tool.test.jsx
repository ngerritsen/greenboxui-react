import React from 'react/addons';
import Immutable from 'immutable';
import ControlInstanceAddTool from './control-instance-add-tool';
import ControlInstanceActions from './control-instance-actions';
import LicenseSlot from '../license/license-slot';
import LicenseStore from '../license/license-store';

const ReactTestUtils = React.addons.TestUtils;

describe('control instance add tool', () => {
    const dummyType = 'FakeType';
    const dummyControl = { typeId: dummyType, instanceId: '9874200', name: 'Valve 1' };

    let controlInstanceAddTool;

    beforeEach(() => {
        spyOn(LicenseStore, 'getAvailableTypes').and.returnValue(Immutable.List.of(
            new LicenseSlot({ controlTypeId: dummyType, total: 10, used: 0 })
        ));

        controlInstanceAddTool = ReactTestUtils.renderIntoDocument(
            <ControlInstanceAddTool/>
        );
    });

    afterEach(() => controlInstanceAddTool.componentWillUnmount());

    it('adds a control', () => {
        const newName = 'New Control Name';

        spyOn(ControlInstanceActions, 'addControl');

        const submitButton = ReactTestUtils.findRenderedDOMComponentWithTag(controlInstanceAddTool, 'button');
        React.findDOMNode(controlInstanceAddTool.refs.selectedControlType).value = dummyType;
        React.findDOMNode(controlInstanceAddTool.refs.controlNameInput).value = newName;
        ReactTestUtils.Simulate.click(submitButton);

        expect(ControlInstanceActions.addControl).toHaveBeenCalledWith(dummyType, newName);
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
        React.findDOMNode(controlInstanceAddTool.refs.selectedControlType).value = dummyType;
        ReactTestUtils.Simulate.click(submitButton);

        expect(addedControls.length).toEqual(10);
        expect(addedControls[0]).toEqual(`${newName} 1`);
        expect(addedControls[9]).toEqual(`${newName} 10`);
    });

    it('does not add controls if amount is higher than license allows', () => {
        const newName = 'New Control Name';
        const amount = 11;

        spyOn(ControlInstanceActions, 'addControl');
        const submitButton = ReactTestUtils.findRenderedDOMComponentWithTag(controlInstanceAddTool, 'button');

        React.findDOMNode(controlInstanceAddTool.refs.controlNameInput).value = newName;
        React.findDOMNode(controlInstanceAddTool.refs.controlAmountInput).value = amount;
        React.findDOMNode(controlInstanceAddTool.refs.selectedControlType).value = dummyType;
        ReactTestUtils.Simulate.click(submitButton);

        expect(ControlInstanceActions.addControl).not.toHaveBeenCalled();
    });

    it('removes whitespace from the control name when adding a control', () => {
        const newName = 'New Control Name';
        const whiteSpacedNewName = '  New Control Name  ';

        spyOn(ControlInstanceActions, 'addControl');

        const submitButton = ReactTestUtils.findRenderedDOMComponentWithTag(controlInstanceAddTool, 'button');

        React.findDOMNode(controlInstanceAddTool.refs.controlNameInput).value = whiteSpacedNewName;
        React.findDOMNode(controlInstanceAddTool.refs.selectedControlType).value = dummyType;
        ReactTestUtils.Simulate.click(submitButton);

        expect(ControlInstanceActions.addControl).toHaveBeenCalledWith(dummyType, newName);
    });

    it('does not add a control with an invalid name', () => {
        const invalidName = ' ';

        spyOn(ControlInstanceActions, 'addControl');

        const submitButton = ReactTestUtils.findRenderedDOMComponentWithTag(controlInstanceAddTool, 'button');

        React.findDOMNode(controlInstanceAddTool.refs.controlNameInput).value = invalidName;
        React.findDOMNode(controlInstanceAddTool.refs.selectedControlType).value = dummyType;
        ReactTestUtils.Simulate.click(submitButton);

        expect(ControlInstanceActions.addControl).not.toHaveBeenCalled();
    });
});