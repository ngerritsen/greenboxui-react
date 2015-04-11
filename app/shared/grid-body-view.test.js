import React from 'react/addons';
import GridBody from './grid-body-view';

const ReactTestUtils = React.addons.TestUtils;

describe('grid body tests', () => {

    let gridBody = {};

    beforeEach(() => {
        gridBody = ReactTestUtils.renderIntoDocument(
            <GridBody columnInfo={[]} data={[]}/>
        );
    });

    it('renders correctly', () => {

    });
});