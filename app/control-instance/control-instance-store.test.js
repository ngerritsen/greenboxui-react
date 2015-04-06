import AltApp from '../core/alt-app';
import ControlInstanceStore from './control-instance-store';
import ControlInstanceActions from './control-instance-actions';

describe('control instance store tests', () => {
    const testControl = {
        controlTypeId: '123',
        name: 'TestControl'
    };
    const addControlAction = ControlInstanceActions.ADD_CONTROL;

    afterEach(() => {
        AltApp.flush();
    });

    it('listens for add a control action', () => {
        AltApp.dispatcher.dispatch({action: addControlAction, data: testControl});

        expect(ControlInstanceStore.getState().controls.length).toBe(1);
    });

    it('adds the right control', () => {
        AltApp.dispatcher.dispatch({action: addControlAction, data: testControl});

        expect(ControlInstanceStore.getState().controls[0].controlTypeId).toBe(testControl.controlTypeId);
        expect(ControlInstanceStore.getState().controls[0].name).toBe(testControl.name);
    });

    it('ignores invalid controls', () => {
        const invalidControl1 = {
            name: 'TestControl'
        };

        const invalidControl2 = {
            controlTypeId: '123'
        };

        AltApp.dispatcher.dispatch({action: addControlAction, data: invalidControl1});
        AltApp.dispatcher.dispatch({action: addControlAction, data: invalidControl2});

        expect(ControlInstanceStore.getState().controls.length).toBe(0);
    });
});
