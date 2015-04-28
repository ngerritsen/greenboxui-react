import Immutable from 'immutable';
import shortId from 'shortid';
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
               new LicenseSlot({ controlTypeId: shortId.generate(), controlTypeName: 'Pump', total: 2 }),
               new LicenseSlot({ controlTypeId: shortId.generate(), controlTypeName: 'Crop Section', total: 10 }),
               new LicenseSlot({ controlTypeId: shortId.generate(), controlTypeName: 'Valve', total: 15 }),
               new LicenseSlot({ controlTypeId: shortId.generate(), controlTypeName: 'Meteo', total: 1 }),
               new LicenseSlot({ controlTypeId: shortId.generate(), controlTypeName: 'Fan', total: 4 }),
               new LicenseSlot({ controlTypeId: shortId.generate(), controlTypeName: 'Custom Alarm', total: 10}),
               new LicenseSlot({ controlTypeId: shortId.generate(), controlTypeName: 'Irrigation Strategy', total: 4}),
               new LicenseSlot({ controlTypeId: shortId.generate(), controlTypeName: 'Irrigation Stage', total: 8})
           )
        });
    }
}

export default AltApp.createActions(LicenseActions);