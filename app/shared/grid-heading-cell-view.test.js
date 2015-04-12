import React from 'react/addons';
import GridHeadingCell from './grid-heading-cell-view';

const ReactTestUtils = React.addons.TestUtils;

describe('grid heading cell tests', () => {
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

    it('should fire sort handler with right parameters when heading cell is clicked', () => {
        ReactTestUtils.Simulate.click(gridHeadingCell.getDOMNode());
        expect(dummyCallback).toHaveBeenCalledWith(dummyColumn.id, !gridHeadingCell.state.sortInversed);
    });

    it('should be in descending sorted mode when sorted prop is true', () => {
        ReactTestUtils.Simulate.click(gridHeadingCell.getDOMNode());
        gridHeadingCell.setProps({ sorted: true });

        const sortedIcon = ReactTestUtils.findRenderedDOMComponentWithTag(gridHeadingCell, 'i');

        expect(gridHeadingCell.state.sortInversed).toBeFalsy();
        expect(sortedIcon.props.className).toContain(descendingSortIconClass);
    });

    it('should be in ascending sorted mode when sorted prop is true', () => {
        ReactTestUtils.Simulate.click(gridHeadingCell.getDOMNode());
        gridHeadingCell.setProps({ sorted: true });

        ReactTestUtils.Simulate.click(gridHeadingCell.getDOMNode());
        gridHeadingCell.setProps({ sorted: true });

        const sortedIcon = ReactTestUtils.findRenderedDOMComponentWithTag(gridHeadingCell, 'i');

        expect(gridHeadingCell.state.sortInversed).toBeTruthy();
        expect(sortedIcon.props.className).toContain(ascendingSortIconClass);
    });

    it('should maintain sort inversed state with unexpected rerenders', () => {
        gridHeadingCell.setState({ sortInversed: false });

        gridHeadingCell.setProps({ sorted: true });

        expect(gridHeadingCell.state.sortInversed).toBeFalsy();
    });

    it('should render capitalized id when no title is provided', () => {
        const testId = 'testId';
        const capitalizedId = 'TestId';

        gridHeadingCell.setProps({ column: { id: testId }});

        const textContent = ReactTestUtils.findRenderedDOMComponentWithTag(gridHeadingCell, 'strong').getDOMNode().textContent;

        expect(textContent).toEqual(capitalizedId);
    });
});