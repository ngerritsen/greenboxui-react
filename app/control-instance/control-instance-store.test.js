import AltApp from '../core/alt-app';
import ControlInstanceStore from './control-instance-store';
import ControlInstanceActions from './control-instance-actions';
import ControlInstanceServerActions from './control-instance-server-actions';

describe('control instance store', () => {
    const optimisticallyAddControlAction = ControlInstanceActions.ADD_CONTROL;
    const optimisticallyRenameControlAction = ControlInstanceActions.RENAME_CONTROL;
    const optimisticallyRemoveControlAction = ControlInstanceActions.REMOVE_CONTROL;

    const successfullyAddControlAction = ControlInstanceServerActions.ADD_CONTROL_SUCCEEDED;
    const successfullyRenameControlAction = ControlInstanceServerActions.RENAME_CONTROL_SUCCEEDED;
    const successfullyRemoveControlAction = ControlInstanceServerActions.REMOVE_CONTROL_SUCCEEDED;

    const optimisticTestControlA = { typeId: '123', name: 'TestControlA', dirty: 20582052 };
    const actualTestControlA = { typeId: '123', name: 'TestControlA', instanceId: 3023742, clean: 20582052 };
    const optimisticTestControlB = { typeId: '456', name: 'TestControlB', dirty: 35235345 };
    const actualTestControlB = { typeId: '456', name: 'TestControlB', instanceId: 2358529, clean: 35235345 };

    afterEach(() => AltApp.flush());

    describe('adds a control tests', () => {
        it('optimistically adds a control', () => {
            optimisticallyAddControl(optimisticTestControlA);

            expect(ControlInstanceStore.getState().controls.length).toEqual(1);
        });

        it('replaces optimistically added control with actual', () => {
            optimisticallyAddControl(optimisticTestControlA);
            successfullyAddControl(actualTestControlA);
            expect(ControlInstanceStore.getState().controls.length).toEqual(1);
        });

        it('adds the right data to optimistic control', () => {
            optimisticallyAddControl(optimisticTestControlA);

            expect(ControlInstanceStore.getState().controls[0].typeId).toEqual(optimisticTestControlA.typeId);
            expect(ControlInstanceStore.getState().controls[0].name).toEqual(optimisticTestControlA.name);
            expect(ControlInstanceStore.getState().controls[0].dirty).toEqual(optimisticTestControlA.dirty);
        });

        it('adds multiple controls', () => {
            optimisticallyAddControl(optimisticTestControlA);
            optimisticallyAddControl(optimisticTestControlB);

            successfullyAddControl(actualTestControlA);
            successfullyAddControl(actualTestControlB);

            expect(ControlInstanceStore.getState().controls.length).toEqual(2);
            expect(ControlInstanceStore.getState().controls[0].instanceId).toEqual(actualTestControlA.instanceId);
            expect(ControlInstanceStore.getState().controls[1].instanceId).toEqual(actualTestControlB.instanceId);
        });
    });

    describe('remove a control tests', () => {
        it('marks an optimistically removed control as dirty', () => {
            const dirtyId = _getNewRandomId();

            optimisticallyAddControl(optimisticTestControlA);
            successfullyAddControl(actualTestControlA);

            const instanceIdToRemove = ControlInstanceStore.getState().controls[0].instanceId;
            console.log(ControlInstanceStore.getState().controls[0]);
            optimisticallyRemoveControl(instanceIdToRemove, dirtyId);
            console.log(ControlInstanceStore.getState().controls[0]);
            expect(ControlInstanceStore.getState().controls[0].dirty).toEqual(dirtyId);
        });

        it('removes one and the right control from multiple controls', () => {
            optimisticallyAddControl(optimisticTestControlA);
            optimisticallyAddControl(optimisticTestControlB);

            const instanceIdA = ControlInstanceStore.getState().controls[0].instanceId;
            const instanceIdB = ControlInstanceStore.getState().controls[1].instanceId;

            optimisticallyRemoveControl(instanceIdA);

            expect(ControlInstanceStore.getState().controls.length).toEqual(1);
            expect(ControlInstanceStore.getState().controls[0].instanceId).toEqual(instanceIdB);
        });
    });

    describe('rename a control tests', () => {
        it('renames a control', () => {
            optimisticallyAddControl(optimisticTestControlA);

            const newName = 'RenamedControlA';
            const instanceIdA = ControlInstanceStore.getState().controls[0].instanceId;

            optimisticallyRenameControl(instanceIdA, newName);

            expect(ControlInstanceStore.getState().controls[0].name).toEqual(newName);
        });

        it('renames the right control', () => {
            optimisticallyAddControl(optimisticTestControlA);
            optimisticallyAddControl(optimisticTestControlB);

            const newName = 'RenamedControlB';
            const instanceIdB = ControlInstanceStore.getState().controls[1].instanceId;

            optimisticallyRenameControl(instanceIdB, newName);

            expect(ControlInstanceStore.getState().controls[1].name).toEqual(newName);
        });

        it('ignores non existing instance', () => {
            optimisticallyAddControl(optimisticTestControlA);

            const newName = 'RenamedControlB';
            const nonExistingInstanceId = 'ThisIdDoesNotExist';
            const controlsBeforeRename = ControlInstanceStore.getState().controls;

            optimisticallyRenameControl(nonExistingInstanceId, newName);

            const controlsAfterRename = ControlInstanceStore.getState().controls;

            expect(controlsBeforeRename).toEqual(controlsAfterRename);
        });
    });

    function optimisticallyAddControl(control) {
        AltApp.dispatcher.dispatch({ action: optimisticallyAddControlAction, data: control });
    }

    function successfullyAddControl(control) {
        AltApp.dispatcher.dispatch({ action: successfullyAddControlAction, data: control });
    }

    function optimisticallyRemoveControl(instanceId, dirtyId) {
        AltApp.dispatcher.dispatch({ action: optimisticallyRemoveControlAction, data: { instanceId: instanceId, dirty: dirtyId } });
    }

    function optimisticallyRenameControl(instanceId, newName) {
        AltApp.dispatcher.dispatch({ action: optimisticallyRenameControlAction, data: { instanceId: instanceId, newName: newName } });
    }
    function _getNewRandomId() {
        return Math.round((Math.random() * 1000000))
    }

});
