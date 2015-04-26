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

    function useLicenseSlot(controlTypeId, amount) {
        AltApp.dispatcher.dispatch({
            action: LicenseActions.USE_LICENSE_SLOT,
            data: { controlTypeId: controlTypeId, amount: amount }
        });
    }
});