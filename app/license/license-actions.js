import AltApp from '../core/alt-app';

class LicenseActions {
    useLicenseSlot(controlTypeId, amount) {
        this.dispatch({
           controlTypeId: controlTypeId,
           amount: amount
        });
    }
}

export default AltApp.createActions(LicenseActions);