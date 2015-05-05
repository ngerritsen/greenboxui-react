import Immutable from 'immutable';

const LicenseSlotRecord = Immutable.Record({
    controlTypeId: null,
    controlTypeName: 'Unknown control type',
    total: 0,
    used: 0
});

export default class LicenseSlot extends LicenseSlotRecord {
    get available() {
        return this.total - this.used;
    }

    get isAvailable() {
        return this.available > 0;
    }
}