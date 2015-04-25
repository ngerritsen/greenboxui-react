import AltApp from '../core/alt-app';
import Immutable from 'immutable';
import LicenseSlot from './license-slot';
import LicenseActions from './license-actions';

class LicenseStore {
    constructor() {
        this.license = Immutable.List.of(
            new LicenseSlot({ controlTypeId: 'Pump', total: 2 }),
            new LicenseSlot({ controlTypeId: 'Crop Section', total: 10 }),
            new LicenseSlot({ controlTypeId: 'Valve', total: 400 }),
            new LicenseSlot({ controlTypeId: 'Meteo', total: 1 }),
            new LicenseSlot({ controlTypeId: 'Fan', total: 4 }),
            new LicenseSlot({ controlTypeId: 'Custom Alarm', total: 10})
        );

        //this.bindAction(LicenseActions.refreshLicense, this.onRefreshLicense);
        this.bindAction(LicenseActions.useLicenseSlot, this.onOptimisticallyUseLicenseSlot);

        this.on('init', this.bootstrap);
    }

    bootstrap() {
        // Prevent alt app flush from converting list to regular js array, sorry guys..
        if (! Immutable.List.isList(this.license)) {
            this.license = Immutable.List(
                new LicenseSlot({ controlTypeId: 'Pump', total: 2 }),
                new LicenseSlot({ controlTypeId: 'Crop Section', total: 10 }),
                new LicenseSlot({ controlTypeId: 'Valve', total: 400 }),
                new LicenseSlot({ controlTypeId: 'Meteo', total: 1 }),
                new LicenseSlot({ controlTypeId: 'Fan', total: 4 }),
                new LicenseSlot({ controlTypeId: 'Custom Alarm', total: 10})
            );
        }
    }

    onRefreshLicense(payload) {
        this.license = payload.license;
    }

    onOptimisticallyUseLicenseSlot(payload) {
        const {amount, controlTypeId} = payload;
        this.license = this.license.map((slot) => {
            if(slot.controlTypeId === controlTypeId) {
                slot = slot.set('used', slot.used + amount);
            }
            return slot;
        });
    }
}

export default AltApp.createStore(LicenseStore, 'LicenseStore');
