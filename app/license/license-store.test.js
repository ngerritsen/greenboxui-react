import Immutable from 'immutable';
import shortId from 'shortid';
import LicenseStore from './license-store';
import LicenseActions from './license-actions';
import LicenseSlot from './license-slot';

describe('license store', () => {
    const dummyLicenseA = new LicenseSlot({
        controlTypeId: shortId.generate(),
        controlTypeName: 'TestControlA',
        total: 10,
        used: 0
    });

    const dummyLicenseB = new LicenseSlot({
        controlTypeId: shortId.generate(),
        controlTypeName: 'TestControlB',
        total: 5,
        used: 2
    });

    beforeEach(() => {
        LicenseStore.license = Immutable.List.of(dummyLicenseA, dummyLicenseB);
        jasmine.clock().install()
    });

    afterEach(() => {
        LicenseStore.license = Immutable.List();
        jasmine.clock().uninstall()
    });

    it('increases used parameter for a license slot on use license slot', () => {
        const amount = 2;
        const typeId = LicenseStore.license.get(0).controlTypeId;
        const usedOld = LicenseStore.license.get(0).used;

        useLicenseSlot(typeId, amount);

        expect(LicenseStore.license.get(0).used).toEqual(usedOld + amount);
    });

    it('get control type name returns the right control type name', () => {
        const typeId = LicenseStore.license.get(0).controlTypeId;
        const typeName = LicenseStore.license.get(0).controlTypeName;
        const result = LicenseStore.getControlTypeName(typeId);
        expect(result).toEqual(typeName);
    });

    function useLicenseSlot(controlTypeId, amount) {
        LicenseActions.useLicenseSlot(controlTypeId, amount);
        jasmine.clock().tick(jasmine.DEFAULT_TIMEOUT_INTERVAL);
    }
});