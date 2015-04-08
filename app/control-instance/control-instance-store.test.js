import AltApp from '../core/alt-app';
import ControlInstanceStore from './control-instance-store';
import ControlInstanceActions from './control-instance-actions';

describe('control instance store tests', () => {
    const addControlAction = ControlInstanceActions.ADD_CONTROL;
    const removeControlAction = ControlInstanceActions.REMOVE_CONTROL;

    const testControlA = {
        controlTypeId: '123',
        name: 'TestControl'
    };

    const testControlB = {
        controlTypeId: '123',
        name: 'TestControl'
    };

    afterEach(() => {
        AltApp.flush();
    });

    describe('add a control tests', () => {

        it('adds a control', () => {
            AltApp.dispatcher.dispatch({action: addControlAction, data: testControlA});

            expect(ControlInstanceStore.getState().controls.length).toEqual(1);
        });

        it('adds multiple controls', () => {
            AltApp.dispatcher.dispatch({action: addControlAction, data: testControlA});
            AltApp.dispatcher.dispatch({action: addControlAction, data: testControlB});

            expect(ControlInstanceStore.getState().controls.length).toEqual(2);
        });

        it('adds the right data to the control', () => {
            AltApp.dispatcher.dispatch({action: addControlAction, data: testControlA});

            expect(ControlInstanceStore.getState().controls[0].controlTypeId).toEqual(testControlA.controlTypeId);
            expect(ControlInstanceStore.getState().controls[0].name).toEqual(testControlA.name);
        });

        it('generates an instance id when adding a control', () => {
            AltApp.dispatcher.dispatch({action: addControlAction, data: testControlA});

            expect(ControlInstanceStore.getState().controls[0].controlInstanceId).toBeDefined();
        });

        it('generates different instance ids when adding controls', () => {
            AltApp.dispatcher.dispatch({action: addControlAction, data: testControlA});
            AltApp.dispatcher.dispatch({action: addControlAction, data: testControlB});

            expect(ControlInstanceStore.getState().controls[0].controlInstanceId)
                .not.toEqual(ControlInstanceStore.getState().controls[1].controlInstanceId);
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

            expect(ControlInstanceStore.getState().controls.length).toEqual(0);
        });
    });

    describe('remove a control tests', () => {

        it('removes a control', () => {
            AltApp.dispatcher.dispatch({action: addControlAction, data: testControlA});

            const instanceIdToRemove = ControlInstanceStore.getState().controls[0].controlInstanceId;
            AltApp.dispatcher.dispatch({action: removeControlAction, data: {controlInstanceId: instanceIdToRemove}});

            expect(ControlInstanceStore.getState().controls.length).toEqual(0);
        });

        it('removes one and the right control from multiple controls', () => {
            AltApp.dispatcher.dispatch({action: addControlAction, data: testControlA});
            AltApp.dispatcher.dispatch({action: addControlAction, data: testControlB});

            const instanceIdA = ControlInstanceStore.getState().controls[0].controlInstanceId;
            const instanceIdB = ControlInstanceStore.getState().controls[1].controlInstanceId;

            AltApp.dispatcher.dispatch({action: removeControlAction, data: {controlInstanceId: instanceIdA}});

            expect(ControlInstanceStore.getState().controls.length).toEqual(1);
            expect(ControlInstanceStore.getState().controls[0].controlInstanceId).toEqual(instanceIdB);
        });
    });
});
