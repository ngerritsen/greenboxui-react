import React from 'react/addons';
import GridActionCell from './grid-action-cell';

const ReactTestUtils = React.addons.TestUtils;

describe('grid action cell', () => {
    const dummyContext = { typeId: 'Valve', instanceId: '9874200', name: 'Valve 1' };
    const dummyHandler = jasmine.createSpy('dummyHandler');
    let gridActionCell;

    beforeEach(() => {
        gridActionCell = ReactTestUtils.renderIntoDocument(
            <GridActionCell context={dummyContext} onAction={dummyHandler} actionIcon='testIcon'/>
        );
    });

    afterEach(() => {
        React.unmountComponentAtNode(document.body);
    });

    it('handles actions', () => {
        ReactTestUtils.Simulate.click(React.findDOMNode(gridActionCell));

        expect(dummyHandler).toHaveBeenCalledWith(dummyContext);
    });
});