import React from 'react/addons';
import GridHeadingCell from './grid-heading-cell';
import GridHeadingRow from './grid-heading-row';

const ReactTestUtils = React.addons.TestUtils;

describe('grid heading row', () => {
    let dummyCallback;
    let gridHeadingRow;

    const dummyColumnInfo = [
        { title: 'Id', columns: 5, id: 'id', unique: true },
        { title: 'Name', columns: 7, id: 'name' }
    ];

    beforeEach(() => {
        dummyCallback = jasmine.createSpy('dummyCallback');
        gridHeadingRow = ReactTestUtils.renderIntoDocument(
            <GridHeadingRow
                columnInfo={dummyColumnInfo}
                onSortBy={dummyCallback}
                sortProperty={''}
            />
        );
    });

    it('fires sort handler with right parameters when heading cell calls on sort by', () => {
        const dummySortProperty = 'id';
        const dummySortInversed = true;

        const headingCells = ReactTestUtils.scryRenderedComponentsWithType(gridHeadingRow, GridHeadingCell);
        const firstHeadingCell = headingCells[0];
        firstHeadingCell.props.onSortBy(dummySortProperty, dummySortInversed);

        expect(dummyCallback).toHaveBeenCalledWith(dummySortProperty, dummySortInversed);
    });
});