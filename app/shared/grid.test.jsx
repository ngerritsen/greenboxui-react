import React from 'react/addons';
import Grid from './grid-view';
import GridRow from './grid-row-view.js';
import GridHeadingRow from './grid-heading-row-view';
import GridBody from './grid-body-view';

const ReactTestUtils = React.addons.TestUtils;

describe('grid tests', () => {
    const dummyColumnInfo = [
        { title: 'Id', columns: 5, id: 'id', unique: true },
        { title: 'Name', columns: 7, id: 'name' }
    ];

    const dummyData = [
        { id: 1, name: 'bear' },
        { id: 2, name: 'armory7' },
        { id: 3, name: 'closet' }
    ];

    let grid;

    beforeEach(() => {
        grid = ReactTestUtils.renderIntoDocument(
            <Grid columnInfo={dummyColumnInfo} data={dummyData}/>
        );
    });

    it('renders the right components with the right properties', () => {
        const gridHeadingRow = ReactTestUtils.findRenderedComponentWithType(grid, GridHeadingRow);
        const gridBody = ReactTestUtils.findRenderedComponentWithType(grid, GridBody);

        expect(gridHeadingRow).toBeDefined();
        expect(gridHeadingRow.props.columnInfo).toEqual(dummyColumnInfo);
        expect(gridHeadingRow.props.onSortBy).toEqual(grid._handleSortBy);

        expect(gridBody).toBeDefined();
        expect(gridBody.props.columnInfo).toEqual(dummyColumnInfo);
        expect(gridBody.props.data).toEqual(dummyData);
    });

    it('passes the right sort properties to the right components when the sort handler is called', () => {
        const dummySortProperty = 'name';

        const gridHeadingRow = ReactTestUtils.findRenderedComponentWithType(grid, GridHeadingRow);
        const gridBody = ReactTestUtils.findRenderedComponentWithType(grid, GridBody);

        gridHeadingRow.props.onSortBy(dummySortProperty, false);

        expect(gridHeadingRow.props.sortProperty).toEqual(dummySortProperty);

        expect(gridBody.props.sortProperty).toEqual(dummySortProperty);
        expect(gridBody.props.sortInversed).toEqual(false);
    });

    it('passes the search parameter to the right components when the search input changes', () => {
        const dummySearchParameter = 'bear';

        grid.refs.searchInput.getDOMNode().value = dummySearchParameter;
        ReactTestUtils.Simulate.change(grid.refs.searchInput);

        const gridBody = ReactTestUtils.findRenderedComponentWithType(grid, GridBody);

        expect(gridBody.props.searchParameter).toEqual(dummySearchParameter);
    });
});