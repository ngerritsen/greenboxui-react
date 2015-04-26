import Immutable from 'immutable';
import AltApp from '../core/alt-app';
import LicenseSlot from './license-slot';

class LicenseActions {
    useLicenseSlot(controlTypeId, amount) {
        this.dispatch({
           controlTypeId: controlTypeId,
           amount: amount
        });
    }

    refreshLicense() {
        this.dispatch({
           license: Immutable.List.of(
               new LicenseSlot({ controlTypeId: 'Pump', total: 2 }),
               new LicenseSlot({ controlTypeId: 'Crop Section', total: 10 }),
               new LicenseSlot({ controlTypeId: 'Valve', total: 15 }),
               new LicenseSlot({ controlTypeId: 'Meteo', total: 1 }),
               new LicenseSlot({ controlTypeId: 'Fan', total: 4 }),
               new LicenseSlot({ controlTypeId: 'Custom Alarm', total: 10})
           )
        });
    }
}

export default AltApp.createActions(LicenseActions);