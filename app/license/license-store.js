import Reflux from 'reflux';
import Immutable from 'immutable';
import LicenseSlot from './license-slot';
import LicenseActions from './license-actions';

export default Reflux.createStore({
    init() {
        this.license = Immutable.List();

        this.listenToMany(LicenseActions);

        LicenseActions.refreshLicense();
    },

    onRefreshLicense(license) {
        this.license = license;
    },

    onUseLicenseSlot(amount, controlTypeId) {
        this.license = this.license.map((slot) => {
            if(slot.controlTypeId === controlTypeId) {
                slot = slot.set('used', slot.used + amount);
            }
            return slot;
        });
    },

    getControlTypeName(typeId) {
        const slot = this.license.find((slot) => slot.controlTypeId === typeId);
        if (slot) {
            return slot.controlTypeName;
        }
        return 'Unknown control type';
    },

    getAvailableTypes() {
        return this.license.filter((slot) => slot.isAvailable);
    }
});
