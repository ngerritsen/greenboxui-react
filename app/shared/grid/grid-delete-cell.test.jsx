import React from 'react/addons';
import GridDeleteCell from './grid-delete-cell';

const ReactTestUtils = React.addons.TestUtils;

describe('grid delete cell', () => {
    const dummyContext = { typeId: 'Valve', instanceId: '9874200', name: 'Valve 1' };
    const dummyDeleteHandler = jasmine.createSpy('dummyDeleteHandler');
    let gridDeleteCell;

    beforeEach(() => {
        gridDeleteCell = ReactTestUtils.renderIntoDocument(
            <GridDeleteCell context={dummyContext} onDelete={dummyDeleteHandler}/>
        );
    });

    it('handles deletes', () => {
        ReactTestUtils.Simulate.click(React.findDOMNode(gridDeleteCell));

        expect(dummyDeleteHandler).toHaveBeenCalledWith(dummyContext);
    });
});