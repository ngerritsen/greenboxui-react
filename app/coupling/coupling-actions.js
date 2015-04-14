import AltApp from '../core/alt-app';

class CouplingActions {
    addCoupling(sourceControl, targetControl) {
        this.dispatch({
            sourceControl: sourceControl,
            targetControl: targetControl
        });
    }

    removeCoupling(coupling) {
        this.dispatch({
            coupling: coupling
        });
    }
}

export default AltApp.createActions(CouplingActions);
