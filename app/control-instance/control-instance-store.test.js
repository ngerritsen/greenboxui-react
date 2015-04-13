import AltApp from '../core/alt-app';
import ControlInstanceStore from './control-instance-store';
import ControlInstanceActions from './control-instance-actions';

describe('control instance store', () => {
    const addControlAction = ControlInstanceActions.ADD_CONTROL;
    const renameControlAction = ControlInstanceActions.RENAME_CONTROL;
    const removeControlAction = ControlInstanceActions.REMOVE_CONTROL;

    const testControlA = { typeId: '123', name: 'TestControlA' };
    const testControlB = { typeId: '456', name: 'TestControlB' };

    afterEach(() => AltApp.flush());

    describe('add a control tests', () => {
        it('adds a control', () => {
            addControl(testControlA);

            expect(ControlInstanceStore.getState().controls.length).toEqual(1);
        });

        it('adds multiple controls', () => {
            addControl(testControlA);
            addControl(testControlB);

            expect(ControlInstanceStore.getState().controls.length).toEqual(2);
        });

        it('adds the right data to the control', () => {
            addControl(testControlA);

            expect(ControlInstanceStore.getState().controls[0].typeId).toEqual(testControlA.typeId);
            expect(ControlInstanceStore.getState().controls[0].name).toEqual(testControlA.name);
        });

        it('generates an instance id when adding a control', () => {
            addControl(testControlA);

            expect(ControlInstanceStore.getState().controls[0].instanceId).toBeDefined();
        });

        it('generates different instance ids when adding controls', () => {
            addControl(testControlA);
            addControl(testControlB);

            expect(ControlInstanceStore.getState().controls[0].instanceId)
                .not.toEqual(ControlInstanceStore.getState().controls[1].instanceId);
        });

        it('ignores invalid controls', () => {
            const invalidControl1 = {name: 'TestControl'};

            const invalidControl2 = {typeId: '123'};

            addControl(invalidControl1);
            addControl(invalidControl2);

            expect(ControlInstanceStore.getState().controls.length).toEqual(0);
        });
    });

    describe('remove a control tests', () => {
        it('removes a control', () => {
            addControl(testControlA);

            const instanceIdToRemove = ControlInstanceStore.getState().controls[0].instanceId;

            removeControl(instanceIdToRemove);

            expect(ControlInstanceStore.getState().controls.length).toEqual(0);
        });

        it('removes one and the right control from multiple controls', () => {
            addControl(testControlA);
            addControl(testControlB);

            const instanceIdA = ControlInstanceStore.getState().controls[0].instanceId;
            const instanceIdB = ControlInstanceStore.getState().controls[1].instanceId;

            removeControl(instanceIdA);

            expect(ControlInstanceStore.getState().controls.length).toEqual(1);
            expect(ControlInstanceStore.getState().controls[0].instanceId).toEqual(instanceIdB);
        });
    });

    describe('rename a control tests', () => {
        it('renames a control', () => {
            addControl(testControlA);

            const newName = 'RenamedControlA';
            const instanceIdA = ControlInstanceStore.getState().controls[0].instanceId;

            renameControl(instanceIdA, newName);

            expect(ControlInstanceStore.getState().controls[0].name).toEqual(newName);
        });

        it('renames the right control', () => {
            addControl(testControlA);
            addControl(testControlB);

            const newName = 'RenamedControlB';
            const instanceIdB = ControlInstanceStore.getState().controls[1].instanceId;

            renameControl(instanceIdB, newName);

            expect(ControlInstanceStore.getState().controls[1].name).toEqual(newName);
        });

        it('ignores non existing instance', () => {
            addControl(testControlA);

            const newName = 'RenamedControlB';
            const nonExistingInstanceId = 'ThisIdDoesNotExist';
            const controlsBeforeRename = ControlInstanceStore.getState().controls;

            renameControl(nonExistingInstanceId, newName);

            const controlsAfterRename = ControlInstanceStore.getState().controls;

            expect(controlsBeforeRename).toEqual(controlsAfterRename);
        });
    });

    function addControl(control) {
        AltApp.dispatcher.dispatch({ action: addControlAction, data: control });
    }

    function removeControl(instanceId) {
        AltApp.dispatcher.dispatch({ action: removeControlAction, data: { instanceId: instanceId } });
    }

    function renameControl(instanceId, newName) {
        AltApp.dispatcher.dispatch({ action: renameControlAction, data: { instanceId: instanceId, newName: newName } });
    }
});
