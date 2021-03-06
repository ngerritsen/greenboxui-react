import Immutable from 'immutable';
import React from 'react/addons';

import GridToolBar from './grid-toolbar';

const ReactTestUtils = React.addons.TestUtils;

describe('grid toolbar', () => {
    const dummyColumnInfo = Immutable.List.of(
        { title: 'Id', columns: 5, id: 'id', unique: true },
        { title: 'Name', columns: 7, id: 'name' }
    );

    let onSearchDummyCallback = jasmine.createSpy('onSearchDummyCallback');

    let gridToolbar;

    beforeEach(() => {
        gridToolbar = ReactTestUtils.renderIntoDocument(
            <GridToolBar columnInfo={dummyColumnInfo} onSearch={onSearchDummyCallback}/>
        );
    });

    afterEach(() => {
        React.unmountComponentAtNode(document.body);
    });

    it('fires the search handler with the correct parameters when the search input changes', () => {
        const dummySearchParameter = 'bear';

        React.findDOMNode(gridToolbar.refs.searchInput).value = dummySearchParameter;
        ReactTestUtils.Simulate.change(gridToolbar.refs.searchInput);

        expect(onSearchDummyCallback).toHaveBeenCalledWith(dummySearchParameter, '');
    });

    it('fires the search handler with the correct parameters when the search by input changes', () => {
        const dummySearchParameter = 'bear';
        const dummySearchByParameter = dummyColumnInfo.get(0).id;

        React.findDOMNode(gridToolbar.refs.searchInput).value = dummySearchParameter;
        React.findDOMNode(gridToolbar.refs.searchBySelection).value = dummySearchByParameter;
        ReactTestUtils.Simulate.change(gridToolbar.refs.searchBySelection);

        expect(onSearchDummyCallback).toHaveBeenCalledWith(dummySearchParameter, dummySearchByParameter);
    });
});