import React from 'react/addons';
import Grid from './grid';
import GridRow from './grid-row';
import GridHeadingRow from './grid-heading-row';
import GridBody from './grid-body';
import GridToolbar from './grid-toolbar';

const ReactTestUtils = React.addons.TestUtils;

describe('grid', () => {
    let grid;

    const dummyColumnInfo = [
        { title: 'Id', columns: 5, id: 'id', unique: true },
        { title: 'Name', columns: 7, id: 'name' }
    ];

    const dummyData = [
        { id: 1, name: 'bear' },
        { id: 2, name: 'armory7' },
        { id: 3, name: 'closet' }
    ];

    beforeEach(() => {
        grid = ReactTestUtils.renderIntoDocument(
            <Grid columnInfo={dummyColumnInfo} data={dummyData}/>
        );
    });

    it('renders the right components with the right properties', () => {
        const gridToolbar = ReactTestUtils.findRenderedComponentWithType(grid, GridToolbar);
        const gridHeadingRow = ReactTestUtils.findRenderedComponentWithType(grid, GridHeadingRow);
        const gridBody = ReactTestUtils.findRenderedComponentWithType(grid, GridBody);

        expect(gridToolbar).toBeDefined();
        expect(gridToolbar.props.columnInfo).toEqual(dummyColumnInfo);
        expect(gridToolbar.props.onSearch).toEqual(grid._handleSearch);

        expect(gridHeadingRow).toBeDefined();
        expect(gridHeadingRow.props.columnInfo).toEqual(dummyColumnInfo);
        expect(gridHeadingRow.props.onSortBy).toEqual(grid._handleSortBy);

        expect(gridBody).toBeDefined();
        expect(gridBody.props.columnInfo).toEqual(dummyColumnInfo);
        expect(gridBody.props.data).toEqual(dummyData);
    });

    it('does not render tools if show tools prop is false', () => {
        grid.setProps({ showTools: false });

        const gridToolbar = ReactTestUtils.scryRenderedComponentsWithType(grid, GridToolbar);
        expect(gridToolbar.length).toEqual(0);
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

    it('passes the search parameter to the right components when the search handler is called', () => {
        const dummySearchParameter = 'bear';
        const dummySearchBy = dummyColumnInfo[0].id;

        const gridToolbar = ReactTestUtils.findRenderedComponentWithType(grid, GridToolbar);
        const gridBody = ReactTestUtils.findRenderedComponentWithType(grid, GridBody);

        gridToolbar.props.onSearch(dummySearchParameter, dummySearchBy);

        expect(gridBody.props.searchParameter).toEqual(dummySearchParameter);
        expect(gridBody.props.searchBy).toEqual(dummySearchBy);
    });

});