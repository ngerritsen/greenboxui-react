import Immutable from 'immutable';
import AltApp from '../core/alt-app';

class ParameterStore {
    constructor() {
        this.parameters = Immutable.List();

        this.on('init', this.bootstrap);
    }

    bootstrap() {
        if (! this.Immutable.List.isList(this.parameters)) {
            this.parameters = Immutable.List(this.parameters);
        }
    }
}

export default AltApp.createStore(ParameterStore, 'ParameterStore');
