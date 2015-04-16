import React from 'react/addons';
import GridPagination from './grid-pagination';

const ReactTestUtils = React.addons.TestUtils;

describe('grid pagination', () => {
    let gridPagination;

    beforeEach(() => {
        gridPagination = ReactTestUtils.renderIntoDocument(
            <GridPagination />
        );
    });

    it('renders', () => {
        ReactTestUtils.isElement(gridPagination);
    });
});