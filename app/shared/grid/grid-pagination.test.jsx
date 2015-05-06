import React from 'react/addons';
import GridPagination from './grid-pagination';

const ReactTestUtils = React.addons.TestUtils;

describe('grid pagination', () => {
    let gridPagination;
    let dummyChangePageHandler;

    const totalRowCount = 105;
    const pageRowCount = 30;

    const totalPageAmount = Math.ceil(totalRowCount/pageRowCount);

    const firstPageLinkIndex = 0;
    const prevPageLinkIndex = 1;
    const nextPageLinkIndex = 2 + (totalPageAmount - 1) + 1;
    const lastPageLinkIndex = 2 + (totalPageAmount - 1) + 2;


    beforeEach(() => {
        dummyChangePageHandler = jasmine.createSpy('dummyChangePageHandler');
        gridPagination = ReactTestUtils.renderIntoDocument(
            <GridPagination
                totalRowCount={105}
                pageRowCount={30}
                onChangePage={dummyChangePageHandler}
                currentPage={0}
            />
        );
    });

    afterEach(() => {
        React.unmountComponentAtNode(document.body);
    });

    it('renders right amount of pagination links', () => {
        const paginationLinks = ReactTestUtils.scryRenderedDOMComponentsWithTag(gridPagination, 'a');
        expect(paginationLinks.length).toEqual(totalPageAmount + 4);
    });

    it('links to page 1 when clicking page 1 link and on page 0', () => {
        const paginationLinks = ReactTestUtils.scryRenderedDOMComponentsWithTag(gridPagination, 'a');
        ReactTestUtils.Simulate.click(React.findDOMNode(paginationLinks[2]));
        expect(dummyChangePageHandler).toHaveBeenCalledWith(0);
    });

    it('links to page 0 when clicking page previous link and on page 1', () => {
        gridPagination.setProps({currentPage: 1});
        const paginationLinks = ReactTestUtils.scryRenderedDOMComponentsWithTag(gridPagination, 'a');
        ReactTestUtils.Simulate.click(React.findDOMNode(paginationLinks[prevPageLinkIndex]));
        expect(dummyChangePageHandler).toHaveBeenCalledWith(0);
    });

    it('links to page 1 when clicking page next link and on page 0', () => {
        const paginationLinks = ReactTestUtils.scryRenderedDOMComponentsWithTag(gridPagination, 'a');
        ReactTestUtils.Simulate.click(React.findDOMNode(paginationLinks[nextPageLinkIndex]));
        expect(dummyChangePageHandler).toHaveBeenCalledWith(1);
    });

    it('links to first page when clicking first page link and on page 2', () => {
        gridPagination.setProps({currentPage: 2});
        const paginationLinks = ReactTestUtils.scryRenderedDOMComponentsWithTag(gridPagination, 'a');
        ReactTestUtils.Simulate.click(React.findDOMNode(paginationLinks[firstPageLinkIndex]));
        expect(dummyChangePageHandler).toHaveBeenCalledWith(0);
    });

    it('links to last page when clicking first page link and on page 0', () => {
        gridPagination.setProps({currentPage: 0});
        const paginationLinks = ReactTestUtils.scryRenderedDOMComponentsWithTag(gridPagination, 'a');
        ReactTestUtils.Simulate.click(React.findDOMNode(paginationLinks[lastPageLinkIndex]));
        expect(dummyChangePageHandler).toHaveBeenCalledWith(totalPageAmount - 1);
    });


    it('links to page 1 when clicking page next link and on page 0', () => {
        const paginationLinks = ReactTestUtils.scryRenderedDOMComponentsWithTag(gridPagination, 'a');
        ReactTestUtils.Simulate.click(React.findDOMNode(paginationLinks[nextPageLinkIndex]));
        expect(dummyChangePageHandler).toHaveBeenCalledWith(1);
    });

    it('does not go page lower when clicking previous page link and on first page', () => {
        const paginationLinks = ReactTestUtils.scryRenderedDOMComponentsWithTag(gridPagination, 'a');
        ReactTestUtils.Simulate.click(
            React.findDOMNode(paginationLinks[prevPageLinkIndex])
        );
        expect(dummyChangePageHandler).not.toHaveBeenCalled();
    });

    it('does not go page higher when clicking next page link and on last page', () => {
        gridPagination.setProps({currentPage: totalPageAmount - 1});
        const paginationLinks = ReactTestUtils.scryRenderedDOMComponentsWithTag(gridPagination, 'a');
        ReactTestUtils.Simulate.click(
            React.findDOMNode(paginationLinks[nextPageLinkIndex])
        );
        expect(dummyChangePageHandler).not.toHaveBeenCalled();
    });
});