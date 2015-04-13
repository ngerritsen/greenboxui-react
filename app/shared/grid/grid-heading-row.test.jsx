import React from 'react/addons';
import GridHeadingCell from './grid-heading-cell';
import GridHeadingRow from './grid-heading-cell';

const ReactTestUtils = React.addons.TestUtils;

xdescribe('grid heading row', () => {
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

        ReactTestUtils.scryRenderedDOMComponentsWithClass(gridHeadingRow);
        let firstHeadingRow = gridHeadingRow[0];
        firstHeadingRow.onSortBy(dummySortProperty, dummySortInversed);

        expect(dummyCallback).toHaveBeenCalledWith(dummySortProperty, dummySortInversed);
    });
});