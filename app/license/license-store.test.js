import Immutable from 'immutable';
import AltApp from '../core/alt-app';
import LicenseStore from './license-store';
import LicenseActions from './license-actions';

describe('license store', () => {
    afterEach(() => AltApp.flush());

    it('increases used parameter for a license slot on use license slot', () => {
        const amount = 2;
        const typeId = LicenseStore.getState().license.get(0).controlTypeId;
        const usedOld = LicenseStore.getState().license.get(0).used;

        useLicenseSlot(typeId, amount);

        expect(LicenseStore.getState().license.get(0).used).toEqual(usedOld + amount);
    });

    it('get control type name returns the right control type name', () => {
        const typeId = LicenseStore.getState().license.get(0).controlTypeId;
        const typeName = LicenseStore.getState().license.get(0).controlTypeName;
        const result = LicenseStore.getControlTypeName(typeId);
        expect(result).toEqual(typeName);
    });

    function useLicenseSlot(controlTypeId, amount) {
        AltApp.dispatcher.dispatch({
            action: LicenseActions.USE_LICENSE_SLOT,
            data: { controlTypeId: controlTypeId, amount: amount }
        });
    }
});