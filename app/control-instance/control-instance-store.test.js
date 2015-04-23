import AltApp from '../core/alt-app';
import shortId from 'shortid';
import ControlInstanceStore from './control-instance-store';
import ControlInstanceActions from './control-instance-actions';
import ControlInstanceServerActions from './control-instance-server-actions';

describe('control instance store', () => {
    const dirtyIdA = shortId.generate();
    const dirtyIdB = shortId.generate();

    const optimisticTestControlA = { typeId: '123', name: 'TestControlA', dirty: dirtyIdA };
    const actualTestControlA = { typeId: '123', name: 'TestControlA', instanceId: shortId.generate(), clean: dirtyIdA };
    const optimisticTestControlB = { typeId: '456', name: 'TestControlB', dirty: dirtyIdB };
    const actualTestControlB = { typeId: '456', name: 'TestControlB', instanceId: shortId.generate(), clean: dirtyIdB };

    afterEach(() => AltApp.flush());

    describe('adds a control tests', () => {
        it('optimistically adds a control', () => {
            optimisticallyAddControl(optimisticTestControlA);

            expect(ControlInstanceStore.getState().controls.count()).toEqual(1);
        });

        it('replaces optimistically added control with actual', () => {
            optimisticallyAddControl(optimisticTestControlA);
            successfullyAddControl(actualTestControlA);
            expect(ControlInstanceStore.getState().controls.count()).toEqual(1);
        });

        it('adds the right data to optimistic control', () => {
            optimisticallyAddControl(optimisticTestControlA);

            expect(ControlInstanceStore.getState().controls.get(0).typeId).toEqual(optimisticTestControlA.typeId);
            expect(ControlInstanceStore.getState().controls.get(0).name).toEqual(optimisticTestControlA.name);
            expect(ControlInstanceStore.getState().controls.get(0).dirty).toEqual(optimisticTestControlA.dirty);
        });

        it('adds multiple controls', () => {
            optimisticallyAddControl(optimisticTestControlA);
            optimisticallyAddControl(optimisticTestControlB);

            successfullyAddControl(actualTestControlA);
            successfullyAddControl(actualTestControlB);

            expect(ControlInstanceStore.getState().controls.count()).toEqual(2);
            expect(ControlInstanceStore.getState().controls.get(0).instanceId).toEqual(actualTestControlA.instanceId);
            expect(ControlInstanceStore.getState().controls.get(1).instanceId).toEqual(actualTestControlB.instanceId);
        });

        it('cancels addition of a control if addition failed', () => {
            optimisticallyAddControl(optimisticTestControlA);
            failToAddControl(dirtyIdA);

            expect(ControlInstanceStore.getState().controls.count()).toEqual(0);
        });
    });

    describe('remove a control tests', () => {
        it('marks an optimistically removed control as dirty', () => {
            const dirtyId = shortId.generate();

            optimisticallyAddControl(optimisticTestControlA);
            successfullyAddControl(actualTestControlA);

            const instanceIdToRemove = ControlInstanceStore.getState().controls.get(0).instanceId;

            optimisticallyRemoveControl(instanceIdToRemove, dirtyId);

            expect(ControlInstanceStore.getState().controls.get(0).dirty).toEqual(dirtyId);
        });

        it('marks one and the right control as dirty from multiple controls', () => {
            const dirtyId = shortId.generate();

            optimisticallyAddControl(optimisticTestControlA);
            successfullyAddControl(actualTestControlA);

            optimisticallyAddControl(optimisticTestControlB);
            successfullyAddControl(actualTestControlB);

            const instanceIdA = ControlInstanceStore.getState().controls.get(0).instanceId;

            optimisticallyRemoveControl(instanceIdA, dirtyId);

            expect(ControlInstanceStore.getState().controls.get(0).instanceId).toEqual(instanceIdA);
            expect(ControlInstanceStore.getState().controls.get(0).dirty).toEqual(dirtyId);
        });

        it('actually removes optimistically removed control after successful removal', () => {
            const dirtyId = shortId.generate();

            optimisticallyAddControl(optimisticTestControlA);
            successfullyAddControl(actualTestControlA);

            const instanceIdA = ControlInstanceStore.getState().controls.get(0).instanceId;

            optimisticallyRemoveControl(instanceIdA, dirtyId);
            successfullyRemoveControl(dirtyId);

            expect(ControlInstanceStore.getState().controls.count()).toEqual(0);
        });

        it('cancels removal of a control if removal failed', () => {
            const dirtyId = shortId.generate();

            optimisticallyAddControl(optimisticTestControlA);
            successfullyAddControl(actualTestControlA);

            const instanceIdA = ControlInstanceStore.getState().controls.get(0).instanceId;

            optimisticallyRemoveControl(instanceIdA, dirtyId);
            failToRemoveControl(dirtyId);

            expect(ControlInstanceStore.getState().controls.count()).toEqual(1);
            expect(ControlInstanceStore.getState().controls.get(0).dirty).toBeFalsy();
        });
    });

    describe('rename a control tests', () => {
        it('renames a control optimistically', () => {
            const dirtyId = shortId.generate();

            optimisticallyAddControl(optimisticTestControlA);
            successfullyAddControl(actualTestControlA);

            const newName = 'RenamedControlA';
            const instanceIdA = ControlInstanceStore.getState().controls.get(0).instanceId;

            optimisticallyRenameControl(instanceIdA, newName, dirtyId);

            expect(ControlInstanceStore.getState().controls.get(0).name).toEqual(newName);
            expect(ControlInstanceStore.getState().controls.get(0).dirty).toEqual(dirtyId);
        });

        it('renames the right control successfully on actual successfull rename', () => {
            const dirtyId = shortId.generate();

            optimisticallyAddControl(optimisticTestControlA);
            successfullyAddControl(actualTestControlA);

            optimisticallyAddControl(optimisticTestControlB);
            successfullyAddControl(actualTestControlB);

            const newName = 'RenamedControlB';
            const instanceIdB = ControlInstanceStore.getState().controls.get(1).instanceId;

            optimisticallyRenameControl(instanceIdB, newName, dirtyId);
            successfullyRenameControl(newName, dirtyId);

            expect(ControlInstanceStore.getState().controls.get(1).name).toEqual(newName);
            expect(ControlInstanceStore.getState().controls.get(1).dirty).toBeFalsy();
        });

        it('ignores non existing instance', () => {
            optimisticallyAddControl(optimisticTestControlA);
            successfullyAddControl(actualTestControlA);

            const newName = 'RenamedControlB';
            const nonExistingInstanceId = 'ThisIdDoesNotExist';
            const controlsBeforeRename = ControlInstanceStore.getState().controls;

            optimisticallyRenameControl(nonExistingInstanceId, newName);

            const controlsAfterRename = ControlInstanceStore.getState().controls;

            expect(controlsBeforeRename).toEqual(controlsAfterRename);
        });

        it('cancels renaming a control on failed rename of control', () => {
            const dirtyId = shortId.generate();

            optimisticallyAddControl(optimisticTestControlA);
            successfullyAddControl(actualTestControlA);

            const newName = 'RenamedControlA';
            const oldName = optimisticTestControlA.name;
            const instanceIdA = ControlInstanceStore.getState().controls.get(0).instanceId;

            optimisticallyRenameControl(instanceIdA, newName, dirtyId);
            failToRenameControl(oldName, dirtyId);

            expect(ControlInstanceStore.getState().controls.get(0).name).toEqual(oldName);
            expect(ControlInstanceStore.getState().controls.get(0).dirty).toBeFalsy();
        });
    });

    function optimisticallyAddControl(control) {
        AltApp.dispatcher.dispatch({
            action: ControlInstanceActions.ADD_CONTROL,
            data: control
        });
    }

    function successfullyAddControl(control) {
        AltApp.dispatcher.dispatch({
            action: ControlInstanceServerActions.ADD_CONTROL_SUCCEEDED,
            data: control
        });
    }

    function failToAddControl(dirtyId) {
        AltApp.dispatcher.dispatch({
            action: ControlInstanceServerActions.ADD_CONTROL_FAILED,
            data: { clean: dirtyId }
        });
    }

    function optimisticallyRemoveControl(instanceId, dirtyId) {
        AltApp.dispatcher.dispatch({
            action: ControlInstanceActions.REMOVE_CONTROL,
            data: { instanceId: instanceId, dirty: dirtyId }
        });
    }

    function successfullyRemoveControl(dirtyId) {
        AltApp.dispatcher.dispatch({
            action: ControlInstanceServerActions.REMOVE_CONTROL_SUCCEEDED,
            data: { clean: dirtyId }
        });
    }

    function failToRemoveControl(dirtyId) {
        AltApp.dispatcher.dispatch({
            action: ControlInstanceServerActions.REMOVE_CONTROL_FAILED,
            data: { clean: dirtyId }
        });
    }

    function optimisticallyRenameControl(instanceId, newName, dirtyId) {
        AltApp.dispatcher.dispatch({
            action: ControlInstanceActions.RENAME_CONTROL,
            data: { instanceId: instanceId, dirty: dirtyId, newName: newName }
        });
    }

    function successfullyRenameControl(newName, dirtyId) {
        AltApp.dispatcher.dispatch({
            action: ControlInstanceServerActions.RENAME_CONTROL_SUCCEEDED,
            data: { newName: newName, clean: dirtyId }
        });
    }

    function failToRenameControl(oldName, dirtyId) {
        AltApp.dispatcher.dispatch({
            action: ControlInstanceServerActions.RENAME_CONTROL_FAILED,
            data: { oldName: oldName, clean: dirtyId }
        });
    }
});
