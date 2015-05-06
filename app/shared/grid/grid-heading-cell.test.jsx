import React from 'react/addons';
import GridHeadingCell from './grid-heading-cell';

const ReactTestUtils = React.addons.TestUtils;

describe('grid heading cell', () => {
    const descendingSortIconClass = 'fa-sort-desc';
    const ascendingSortIconClass = 'fa-sort-asc';

    let dummyCallback;
    let gridHeadingCell;

    const dummyColumn = {
        title: 'Dummy Column',
        id: 'dummyColumn'
    };

    beforeEach(() => {
        dummyCallback = jasmine.createSpy('dummyCallback');
        gridHeadingCell = ReactTestUtils.renderIntoDocument(
            <GridHeadingCell column={dummyColumn} onSortBy={dummyCallback} sorted={false}/>
        );
    });

    afterEach(() => {
        React.unmountComponentAtNode(document.body);
    });

    it('fires sort handler with right parameters when heading cell is clicked', () => {
        ReactTestUtils.Simulate.click(React.findDOMNode(gridHeadingCell));
        expect(dummyCallback).toHaveBeenCalledWith(dummyColumn.id, !gridHeadingCell.state.sortInversed);
    });

    it('does not fire sort handler if column has sort option false when heading cell is clicked', () => {
        const dummyColumnNoSort = {
            title: 'Dummy Column',
            id: 'dummyColumn',
            sort: false
        };
        gridHeadingCell.setProps({ column: dummyColumnNoSort });
        ReactTestUtils.Simulate.click(React.findDOMNode(gridHeadingCell));
        expect(dummyCallback).not.toHaveBeenCalled();
    });

    it('is in descending sorted mode when sorted prop is true', () => {
        ReactTestUtils.Simulate.click(React.findDOMNode(gridHeadingCell));
        gridHeadingCell.setProps({ sorted: true });

        const sortedIcon = ReactTestUtils.findRenderedDOMComponentWithTag(gridHeadingCell, 'i');

        expect(gridHeadingCell.state.sortInversed).toBeFalsy();
        expect(sortedIcon.props.className).toContain(descendingSortIconClass);
    });

    it('is in ascending sorted mode when sorted prop is true', () => {
        ReactTestUtils.Simulate.click(React.findDOMNode(gridHeadingCell));
        gridHeadingCell.setProps({ sorted: true });

        ReactTestUtils.Simulate.click(React.findDOMNode(gridHeadingCell));
        gridHeadingCell.setProps({ sorted: true });

        const sortedIcon = ReactTestUtils.findRenderedDOMComponentWithTag(gridHeadingCell, 'i');

        expect(gridHeadingCell.state.sortInversed).toBeTruthy();
        expect(sortedIcon.props.className).toContain(ascendingSortIconClass);
    });

    it('maintains sort inversed state with unexpected rerenders', () => {
        gridHeadingCell.setState({ sortInversed: false });

        gridHeadingCell.setProps({ sorted: true });

        expect(gridHeadingCell.state.sortInversed).toBeFalsy();
    });

    it('renders capitalized id when no title is provided', () => {
        const testId = 'testId';
        const capitalizedId = 'TestId';

        gridHeadingCell.setProps({ column: { id: testId }});

        const headingCell = ReactTestUtils.findRenderedDOMComponentWithTag(gridHeadingCell, 'strong');
        const textContent = React.findDOMNode(headingCell).textContent;
        expect(textContent).toEqual(capitalizedId);
    });
});