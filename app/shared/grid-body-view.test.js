import React from 'react/addons';
import GridBody from './grid-body-view';
import GridRow from './grid-row-view';

const ReactTestUtils = React.addons.TestUtils;

describe('grid body tests', () => {
    const dummyColumnInfo = [
        { title: 'Id', columns: 6, id: 'id', unique: true },
        { title: 'Name', columns: 6, id: 'name' }
    ];
    const dummyData = [
        { id: 1, name: 'bear' },
        { id: 2, name: 'armory7' },
        { id: 3, name: 'closet' }
    ];

    let gridBody = {};

    beforeEach(() => {
        gridBody = ReactTestUtils.renderIntoDocument(
            <GridBody columnInfo={dummyColumnInfo} data={dummyData}/>
        );
    });

    it('should render correct rows', () => {
        const renderedRows = ReactTestUtils.scryRenderedComponentsWithType(gridBody, GridRow);

        expect(renderedRows.length).toEqual(3);

        expect(renderedRows[0].props.columnInfo).toEqual(dummyColumnInfo);
        expect(renderedRows[0].props.data).toEqual(dummyData[0]);

        expect(renderedRows[1].props.columnInfo).toEqual(dummyColumnInfo);
        expect(renderedRows[1].props.data).toEqual(dummyData[1]);

        expect(renderedRows[2].props.columnInfo).toEqual(dummyColumnInfo);
        expect(renderedRows[2].props.data).toEqual(dummyData[2]);
    });

    it('should render no rows when there is no data', () => {
        gridBody.setProps({ data: [] });
        const renderedRows = ReactTestUtils.scryRenderedComponentsWithType(gridBody, GridRow);

        expect(renderedRows.length).toEqual(0);
    });

    describe('row keys', () => {
        it('should set the key to the correct value when there is an unique column', () => {
            const renderedRows = ReactTestUtils.scryRenderedComponentsWithType(gridBody, GridRow);
            expect(renderedRows[0].props.reactKey).toEqual(1);
            expect(renderedRows[1].props.reactKey).toEqual(2);
            expect(renderedRows[2].props.reactKey).toEqual(3);
        });

        it('should set the key to the index when there is no unique column', () => {
            let noUniqueColumnInfo = dummyColumnInfo.slice(); /* use slice to copy array by value */
            noUniqueColumnInfo[0].unique = false;
            gridBody.setProps({ columnInfo: noUniqueColumnInfo });
            const renderedRows = ReactTestUtils.scryRenderedComponentsWithType(gridBody, GridRow);
            expect(renderedRows[0].props.reactKey).toEqual(0);
            expect(renderedRows[1].props.reactKey).toEqual(1);
            expect(renderedRows[2].props.reactKey).toEqual(2);
        });
    });

    describe('sorting and searching rows', () => {
        it('should sort rows correctly when there is a sort property specified', () => {
            gridBody.setProps({ sortProperty: 'name' });
            const renderedRows = ReactTestUtils.scryRenderedComponentsWithType(gridBody, GridRow);

            expect(renderedRows[0].props.data).toEqual(dummyData[1]);
            expect(renderedRows[1].props.data).toEqual(dummyData[0]);
            expect(renderedRows[2].props.data).toEqual(dummyData[2]);
        });

        it('should sort rows inversed when there is a sort property specified and sort inversed property is true', () => {
            gridBody.setProps({ sortProperty: 'name', sortInversed: true });
            const renderedRows = ReactTestUtils.scryRenderedComponentsWithType(gridBody, GridRow);

            expect(renderedRows[0].props.data).toEqual(dummyData[2]);
            expect(renderedRows[1].props.data).toEqual(dummyData[0]);
            expect(renderedRows[2].props.data).toEqual(dummyData[1]);
        });

        it('should show the correct rows when there is a search parameter specified', () => {
            gridBody.setProps({ searchParameter: dummyData[1].name });
            const renderedRows = ReactTestUtils.scryRenderedComponentsWithType(gridBody, GridRow);

            expect(renderedRows.length).toBe(1);
            expect(renderedRows[0].props.data).toEqual(dummyData[1]);
        });

        it('should show no rows when there is a non existing search parameter specified', () => {
            gridBody.setProps({ searchParameter: 'i do not exist' });
            const renderedRows = ReactTestUtils.scryRenderedComponentsWithType(gridBody, GridRow);

            expect(renderedRows.length).toBe(0);
        });

        it('should sort and filter rows correctly with a search parameter and sort property defined', () => {
            gridBody.setProps({ sortProperty: 'name' });
            gridBody.setProps({ searchParameter: 'r' });
            const renderedRows = ReactTestUtils.scryRenderedComponentsWithType(gridBody, GridRow);

            expect(renderedRows[0].props.data).toEqual(dummyData[1]);
            expect(renderedRows[1].props.data).toEqual(dummyData[0]);
        });

        it('should find a numeric search parameter in string values', () => {
            gridBody.setProps({ searchParameter: 7 });
            const renderedRows = ReactTestUtils.scryRenderedComponentsWithType(gridBody, GridRow);

            expect(renderedRows[0].props.data).toEqual(dummyData[1]);
        });

        it('should find  astringified numeric search parameter in numeric values', () => {
            gridBody.setProps({ searchParameter: '1' });
            const renderedRows = ReactTestUtils.scryRenderedComponentsWithType(gridBody, GridRow);

            expect(renderedRows[0].props.data).toEqual(dummyData[0]);
        });
    });
});