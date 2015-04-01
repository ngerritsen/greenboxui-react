import AltApplication from '../core/alt-application';
import ControlInstanceActions from './control-instance-actions';

class ControlInstanceStore {
    constructor() {
        this.controls = [{
            controlTypeId: 'wefp8u2c3r023ry283r',
            name: 'valvy'
        }];

        setTimeout(() => {
            ControlInstanceActions.addControl({
                controlTypeId: 'wefwft2t4f2tgf',
                name: 'unity'
            });
        }, 1000);

        this.bindAction(ControlInstanceActions.addControl, this.onControlAdded)
    }

    onControlAdded(payload){
        const {controlTypeId, name} = payload;
        this.controls.push({
            controlTypeId: controlTypeId,
            name: name
        });
    }
}

export default AltApplication.createStore(ControlInstanceStore);
