import Reflux from 'reflux';
import Immutable from 'immutable';
import shortId from 'shortid';
import LicenseSlot from './license-slot';
import LicenseActions from './license-actions';

export default Reflux.createStore({
    init() {
        this.license = Immutable.List();

        this.listenToMany(LicenseActions);

        LicenseActions.refreshLicense(getLicense());
    },

    onRefreshLicense(license) {
        this.license = license;
    },

    onUseLicenseSlot(controlTypeId, amount) {
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

function getLicense() {
    return  Immutable.List.of(
        new LicenseSlot({ controlTypeId: shortId.generate(), controlTypeName: 'Pump', total: 2 }),
        new LicenseSlot({ controlTypeId: shortId.generate(), controlTypeName: 'Crop Section', total: 10 }),
        new LicenseSlot({ controlTypeId: shortId.generate(), controlTypeName: 'Valve', total: 15 }),
        new LicenseSlot({ controlTypeId: shortId.generate(), controlTypeName: 'Meteo', total: 1 }),
        new LicenseSlot({ controlTypeId: shortId.generate(), controlTypeName: 'Fan', total: 4 }),
        new LicenseSlot({ controlTypeId: shortId.generate(), controlTypeName: 'Custom Alarm', total: 10}),
        new LicenseSlot({ controlTypeId: shortId.generate(), controlTypeName: 'Irrigation Strategy', total: 4}),
        new LicenseSlot({ controlTypeId: shortId.generate(), controlTypeName: 'Irrigation Stage', total: 8})
    );
}
