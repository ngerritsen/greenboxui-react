import React from 'react/addons';
import Immutable from 'immutable';
import GridRow from '../shared/grid/grid-row';
import LicenseView from './license-view';
import LicenseStore from './license-store';
import LicenseSlot from './license-slot';

const ReactTestUtils = React.addons.TestUtils;

describe('license view', () => {

    const dummyLicense = Immutable.List.of(
        new LicenseSlot({ controlTypeId: 'Pump', total: 2, used: 0 }),
        new LicenseSlot({ controlTypeId: 'Valve', total: 10, used: 0 }),
        new LicenseSlot({ controlTypeId: 'Fan', total: 0, used: 0 })
    );

    let licenseView;

    beforeEach(() => {
        LicenseStore.license = dummyLicense;
        licenseView = ReactTestUtils.renderIntoDocument(
            <LicenseView/>
        );
    });

    afterEach(() => {
        licenseView.componentWillUnmount();
        React.unmountComponentAtNode(document.body);
    });

    it('gets initial license state and shows only owned licenses', () => {
        const rows = ReactTestUtils.scryRenderedComponentsWithType(licenseView, GridRow);

        expect(rows.length).toEqual(2);
    });
});