import AltApp from '../core/alt-app';
import Immutable from 'immutable';
import LicenseSlot from './license-slot';
import LicenseActions from './license-actions';

class LicenseStore {
    constructor() {
        this.license = Immutable.List.of(
            new LicenseSlot({ controlTypeId: 'Pump', total: 100, used: 50 }),
            new LicenseSlot({ controlTypeId: 'Crop Section', total: 100, used: 20 }),
            new LicenseSlot({ controlTypeId: 'Valve', total: 40, used: 10 }),
            new LicenseSlot({ controlTypeId: 'Meteo', total: 100, used: 70 }),
            new LicenseSlot({ controlTypeId: 'Fan', total: 120 }),
            new LicenseSlot({ controlTypeId: 'Custom Alarm', total: 10, used: 20})
        );

        //this.bindAction(LicenseActions.refreshLicense, this.onRefreshLicense);
        //this.bindAction(LicenseActions.useLicenseSlot, this.onOptimisticallyUseLicenseSlot);

        this.on('init', this.bootstrap);
    }

    bootstrap() {
        // Prevent alt app flush from converting list to regular js array, sorry guys..
        if (! Immutable.List.isList(this.controls)) {
            this.controls = Immutable.List(this.controls);
        }
    }

    onRefreshLicense(payload) {
        this.license = payload.license;
    }

    onOptimisticallyUseLicenseSlot(payload) {
        const {amount, controlTypeId} = payload;
        this.license = this.license.map((slot) => {
            if(slot.controlTypeId === controlTypeId) {
                slot.set('used', slot.used + amount)
            }
        });
    }
}

export default AltApp.createStore(LicenseStore, 'LicenseStore');
