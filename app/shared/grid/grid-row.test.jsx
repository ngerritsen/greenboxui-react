import React from 'react/addons';
import GridRow from './grid-row';
import GridEditableCell from './grid-editable-cell';
import GridDeleteCell from './grid-delete-cell';

const ReactTestUtils = React.addons.TestUtils;

describe('grid row', () => {
    const dummyColumnInfo = [
        { title: 'Id', columns: 5, id: 'id', unique: true },
        { title: 'Name', columns: 7, id: 'name' }
    ];
    const dummyData = {
        id: 1,
        name: 'bear'
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

    it('renders correct data in correct order', () => {
        const renderedData = ReactTestUtils.scryRenderedDOMComponentsWithTag(gridRow, 'span');
        expect(renderedData.length).toEqual(2);

        expect(renderedData[0].getDOMNode().textContent).toEqual('1');
        expect(renderedData[1].getDOMNode().textContent).toEqual('bear');
    });

    it('renders correct column widths', () => {
        const renderedCells = ReactTestUtils.scryRenderedDOMComponentsWithTag(gridRow, 'div');
        expect(renderedCells.length).toEqual(2);

        expect(renderedCells[0].props.className).toContain('small-5');
        expect(renderedCells[1].props.className).toContain('small-7');
    });

    it('renders correct cell templates with correct props', () => {
        const dummyFunc = () => 'dummy!';
        const dummyDeleteFunc = () => 'dummy delete!';
        const templatedDummyColumnInfo = [
            { title: 'Id', columns: 4, id: 'id', unique: true, template: DummyTemplate },
            { title: 'Name', columns: 4, id: 'name', editAble: true, onEdit: dummyFunc },
            { title: 'Delete', columns: 4, id: 'delete', cellType: 'delete', onDelete: dummyDeleteFunc }
        ];

        gridRow.setProps({ columnInfo: templatedDummyColumnInfo });

        const dummyTemplateCell = ReactTestUtils.findRenderedComponentWithType(gridRow, DummyTemplate);
        const editableCell = ReactTestUtils.findRenderedComponentWithType(gridRow, GridEditableCell);
        const deleteCell = ReactTestUtils.findRenderedComponentWithType(gridRow, GridDeleteCell);

        expect(dummyTemplateCell).toBeDefined();
        expect(dummyTemplateCell.props.context).toEqual(dummyData);
        expect(dummyTemplateCell.props.value).toEqual(dummyData['id']);

        expect(editableCell).toBeDefined();
        expect(editableCell.props.context).toEqual(dummyData);
        expect(editableCell.props.value).toEqual(dummyData['name']);
        expect(editableCell.props.onEdit).toEqual(dummyFunc);

        expect(deleteCell).toBeDefined();
        expect(deleteCell.props.context).toEqual(dummyData);
        expect(deleteCell.props.onDelete).toEqual(dummyDeleteFunc);
    });
});