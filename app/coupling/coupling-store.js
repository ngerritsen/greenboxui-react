import AltApp from '../core/alt-app';
import CouplingActions from './coupling-actions';

class CouplingStore {
    constructor() {
        this.couplings = [];

        this.bindAction(CouplingActions.addCoupling, this.onCouplingAdded);
        this.bindAction(CouplingActions.removeCoupling, this.onCouplingRemoved);
    }

    onCouplingAdded(coupling) {
        if (coupling) {
            this.couplings.push(coupling);
        }
    }

    onCouplingRemoved(payload) {
        if (payload.coupling) {
            const couplingToRemove = payload.coupling;
            this.couplings = this.couplings.filter((coupling) => coupling !== couplingToRemove);
        }
    }
}

export default AltApp.createStore(CouplingStore);
