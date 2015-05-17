import Immutable from 'immutable';
import React from 'react/addons';

import GridRow from './grid-row';
import GridEditableCell from './grid-cells/grid-editable-cell';
import GridActionCell from './grid-cells/grid-action-cell';
import GridProgressCell from './grid-cells/grid-progress-cell';
import GridCellTypes from './grid-cell-types';

const ReactTestUtils = React.addons.TestUtils;

describe('grid row', () => {
    const dummyColumnInfo = Immutable.List.of(
        { title: 'Id', columns: 5, id: 'id', unique: true },
        { title: 'Name', columns: 7, id: 'name' }
    );
    const dummyData = {
        id: 1,
        name: 'bear',
        progress: 2,
        total: 1,
        dummy: { editable: true }
    };

    const DummyTemplate = React.createClass({
        render() { return <div></div>; }
    });

    let gridRow;

    beforeEach(() => {
        gridRow = ReactTestUtils.renderIntoDocument(
            <GridRow columnInfo={dummyColumnInfo} data={dummyData}/>
        );
    });

    afterEach(() => {
        React.unmountComponentAtNode(document.body);
    });

    it('renders correct data in correct order', () => {
        const renderedData = ReactTestUtils.scryRenderedDOMComponentsWithTag(gridRow, 'span');
        expect(renderedData.length).toEqual(2);

        expect(React.findDOMNode(renderedData[0]).textContent).toEqual('1');
        expect(React.findDOMNode(renderedData[1]).textContent).toEqual('bear');
    });

    it('renders correct column widths', () => {
        const renderedCells = ReactTestUtils.scryRenderedDOMComponentsWithTag(gridRow, 'div');
        expect(renderedCells.length).toEqual(2);

        expect(renderedCells[0].props.className).toContain('small-5');
        expect(renderedCells[1].props.className).toContain('small-7');
    });

    it('renders correct cell templates with correct props', () => {
        const dummyEditFunc = () => 'dummy!';
        const dummyActionFunc = () => 'dummy action!';
        const templatedDummyColumnInfo = [
            { title: 'Id', columns: 4, id: 'id', type: GridCellTypes.custom, unique: true, template: DummyTemplate },
            { title: 'Name', columns: 4, id: 'name', type: GridCellTypes.editable, handler: dummyEditFunc },
            { title: 'Action', columns: 4, id: 'action', type: GridCellTypes.action, handler: dummyActionFunc, actionIcon: 'testIcon' },
            { title: 'Progress', columns: 2, id: 'progress', type: GridCellTypes.progress, total: 'total', value: 'progress' },
            { title: 'Dummy', columns: 2, id: 'dummy', type: ((data) => data.dummy.editable ? GridCellTypes.editable : GridCellTypes.readonly), handler: dummyEditFunc }
        ];

        gridRow.setProps({ columnInfo: templatedDummyColumnInfo });

        const dummyTemplateCell = ReactTestUtils.findRenderedComponentWithType(gridRow, DummyTemplate);
        const editableCells = ReactTestUtils.scryRenderedComponentsWithType(gridRow, GridEditableCell);
        const actionCell = ReactTestUtils.findRenderedComponentWithType(gridRow, GridActionCell);
        const progressCell = ReactTestUtils.findRenderedComponentWithType(gridRow, GridProgressCell);

        expect(dummyTemplateCell).toBeDefined();
        expect(dummyTemplateCell.props.context).toEqual(dummyData);
        expect(dummyTemplateCell.props.value).toEqual(dummyData.id);

        expect(editableCells[0]).toBeDefined();
        expect(editableCells[0].props.context).toEqual(dummyData);
        expect(editableCells[0].props.value).toEqual(dummyData.name);
        expect(editableCells[0].props.onEdit).toEqual(dummyEditFunc);

        expect(actionCell).toBeDefined();
        expect(actionCell.props.context).toEqual(dummyData);
        expect(actionCell.props.onAction).toEqual(dummyActionFunc);

        expect(progressCell).toBeDefined();
        expect(progressCell.props.total).toEqual(dummyData.total);

        expect(editableCells[1]).toBeDefined();
        expect(editableCells[1].props.context).toEqual(dummyData);
        expect(editableCells[1].props.value).toEqual(dummyData.dummy);
        expect(editableCells[1].props.onEdit).toEqual(dummyEditFunc);
    });
});