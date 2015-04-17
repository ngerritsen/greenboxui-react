import React from 'react/addons';
import GridEditableCell from './grid-editable-cell';

const ReactTestUtils = React.addons.TestUtils;

describe('grid editable cell', () => {
    const outOfEditModeIconClass = 'fa-pencil';
    const inEditModeIconClass = 'fa-check-circle';
    const initialValue = 'initial value';
    const dummyContext = {
        dummyNum: 1,
        dummyStr: 'hello'
    };

    let dummyCallback;
    let gridBody = {};

    beforeEach(() => {
        dummyCallback = jasmine.createSpy('dummyCallback');
        gridBody = ReactTestUtils.renderIntoDocument(
            <GridEditableCell context={dummyContext} onEdit={dummyCallback} value={initialValue}/>
        );
    });

    describe('edit mode switching' , () => {
        it('should initially be not in edit mode', () => {
            expect(gridBody.state.editMode).toBeFalsy();
            const toggleButton = ReactTestUtils.findRenderedDOMComponentWithTag(gridBody, 'i');

            expect(toggleButton.props.className).toContain(outOfEditModeIconClass);
        });

        it('switches to edit mode', () => {
            ReactTestUtils.Simulate.click(gridBody.refs.toggleEditMode);
            const toggleButton = ReactTestUtils.findRenderedDOMComponentWithTag(gridBody, 'i');

            expect(gridBody.state.editMode).toBeTruthy();
            expect(toggleButton.props.className).toContain(inEditModeIconClass);
        });

        it('switches back to not edit mode', () => {
            ReactTestUtils.Simulate.click(gridBody.refs.toggleEditMode);
            ReactTestUtils.Simulate.click(gridBody.refs.toggleEditMode);
            const toggleButton = ReactTestUtils.findRenderedDOMComponentWithTag(gridBody, 'i');

            expect(gridBody.state.editMode).toBeFalsy();
            expect(toggleButton.props.className).toContain(outOfEditModeIconClass);
        });
    });

    describe('submitting edits', () => {
        it('should call on edit handler with right parameters when submitting a valid edit', () => {
            const newValue = 'new value';

            ReactTestUtils.Simulate.click(gridBody.refs.toggleEditMode);
            React.findDOMNode(gridBody.refs.editedValueInput).value = newValue;

            ReactTestUtils.Simulate.click(gridBody.refs.toggleEditMode);

            expect(dummyCallback).toHaveBeenCalledWith(newValue, dummyContext);
        });

        it('doess not call on edit handler when submitting a non changed edit', () => {
            const initialValueWhiteSpaced = initialValue + ' ';
            ReactTestUtils.Simulate.click(gridBody.refs.toggleEditMode);
            React.findDOMNode(gridBody.refs.editedValueInput).value = initialValueWhiteSpaced;

            ReactTestUtils.Simulate.click(gridBody.refs.toggleEditMode);

            expect(dummyCallback).not.toHaveBeenCalled();
        });

        it('does not call on edit handler when submitting a whitespace edit', () => {
            const whiteSpace = ' ';
            ReactTestUtils.Simulate.click(gridBody.refs.toggleEditMode);
            React.findDOMNode(gridBody.refs.editedValueInput).value = whiteSpace;

            ReactTestUtils.Simulate.click(gridBody.refs.toggleEditMode);

            expect(dummyCallback).not.toHaveBeenCalled();
        });

        it('does not call on edit handler when submitting a non changed edit with trailing whitespace', () => {
            ReactTestUtils.Simulate.click(gridBody.refs.toggleEditMode);
            React.findDOMNode(gridBody.refs.editedValueInput).value = initialValue + ' ';

            ReactTestUtils.Simulate.click(gridBody.refs.toggleEditMode);

            expect(dummyCallback).not.toHaveBeenCalled();
        });
    });

    describe('submitting numerical edits', () => {
        const initialNumericalValue = 123;

        beforeEach(() => {
            dummyCallback = jasmine.createSpy('dummyCallback');
            gridBody = ReactTestUtils.renderIntoDocument(
                <GridEditableCell context={dummyContext} onEdit={dummyCallback} value={initialNumericalValue}/>
            );
        });

        it('calls on edit handler with right parameters when submitting a valid numerical value', () => {
            const newNumericalValue = 456;

            ReactTestUtils.Simulate.click(gridBody.refs.toggleEditMode);
            React.findDOMNode(gridBody.refs.editedValueInput).value = newNumericalValue;

            ReactTestUtils.Simulate.click(gridBody.refs.toggleEditMode);

            expect(dummyCallback).toHaveBeenCalledWith(newNumericalValue.toString(), dummyContext);
        });

        it('does not call on edit handler when submitting the same numerical value', () => {
            ReactTestUtils.Simulate.click(gridBody.refs.toggleEditMode);
            React.findDOMNode(gridBody.refs.editedValueInput).value = initialNumericalValue;

            ReactTestUtils.Simulate.click(gridBody.refs.toggleEditMode);

            expect(dummyCallback).not.toHaveBeenCalled();
        });
    });
});