import shortId from 'shortid';
import ControlInstanceStore from './control-instance-store';
import ControlInstanceActions from './control-instance-actions';

describe('control instance store', () => {
    const dirtyA = shortId.generate();
    const dirtyB = shortId.generate();

    const optimisticTestControlA = { typeId: '123', name: 'TestControlA', dirty: dirtyA };
    const actualTestControlA = { typeId: '123', name: 'TestControlA', instanceId: shortId.generate(), clean: dirtyA };
    const optimisticTestControlB = { typeId: '456', name: 'TestControlB', dirty: dirtyB };
    const actualTestControlB = { typeId: '456', name: 'TestControlB', instanceId: shortId.generate(), clean: dirtyB };

    beforeEach(() => {
        ControlInstanceStore.controls = Immutable.List();
        jasmine.clock().install()
    });

    afterEach(() => {
        ControlInstanceStore.controls = Immutable.List();
        jasmine.clock().uninstall()
    });

    describe('adds a control tests', () => {
        it('optimistically adds a control', () => {
            optimisticallyAddControl(optimisticTestControlA);

            expect(ControlInstanceStore.controls.count()).toEqual(1);
        });

        it('replaces optimistically added control with actual', () => {
            optimisticallyAddControl(optimisticTestControlA);
            successfullyAddControl(actualTestControlA);
            expect(ControlInstanceStore.controls.count()).toEqual(1);
        });

        it('adds the right data to optimistic control', () => {
            optimisticallyAddControl(optimisticTestControlA);

            expect(ControlInstanceStore.controls.get(0).typeId).toEqual(optimisticTestControlA.typeId);
            expect(ControlInstanceStore.controls.get(0).name).toEqual(optimisticTestControlA.name);
            expect(ControlInstanceStore.controls.get(0).dirty).toEqual(optimisticTestControlA.dirty);
        });

        it('adds multiple controls', () => {
            optimisticallyAddControl(optimisticTestControlA);
            optimisticallyAddControl(optimisticTestControlB);

            successfullyAddControl(actualTestControlA);
            successfullyAddControl(actualTestControlB);

            expect(ControlInstanceStore.controls.count()).toEqual(2);
            expect(ControlInstanceStore.controls.get(0).instanceId).toEqual(actualTestControlA.instanceId);
            expect(ControlInstanceStore.controls.get(1).instanceId).toEqual(actualTestControlB.instanceId);
        });

        it('cancels addition of a control if addition failed', () => {
            optimisticallyAddControl(optimisticTestControlA);
            failToAddControl(dirtyA);

            expect(ControlInstanceStore.controls.count()).toEqual(0);
        });
    });

    describe('remove a control tests', () => {
        it('marks an optimistically removed control as dirty', () => {
            const dirty = shortId.generate();

            optimisticallyAddControl(optimisticTestControlA);
            successfullyAddControl(actualTestControlA);

            const instanceIdToRemove = ControlInstanceStore.controls.get(0).instanceId;

            optimisticallyRemoveControl(instanceIdToRemove, dirty);

            expect(ControlInstanceStore.controls.get(0).dirty).toEqual(dirty);
        });

        it('marks one and the right control as dirty from multiple controls', () => {
            const dirty = shortId.generate();

            optimisticallyAddControl(optimisticTestControlA);
            successfullyAddControl(actualTestControlA);

            optimisticallyAddControl(optimisticTestControlB);
            successfullyAddControl(actualTestControlB);

            const instanceIdA = ControlInstanceStore.controls.get(0).instanceId;

            optimisticallyRemoveControl(instanceIdA, dirty);

            expect(ControlInstanceStore.controls.get(0).instanceId).toEqual(instanceIdA);
            expect(ControlInstanceStore.controls.get(0).dirty).toEqual(dirty);
        });

        it('actually removes optimistically removed control after successful removal', () => {
            const dirty = shortId.generate();

            optimisticallyAddControl(optimisticTestControlA);
            successfullyAddControl(actualTestControlA);

            const instanceIdA = ControlInstanceStore.controls.get(0).instanceId;

            optimisticallyRemoveControl(instanceIdA, dirty);
            successfullyRemoveControl(dirty);

            expect(ControlInstanceStore.controls.count()).toEqual(0);
        });

        it('cancels removal of a control if removal failed', () => {
            const dirty = shortId.generate();

            optimisticallyAddControl(optimisticTestControlA);
            successfullyAddControl(actualTestControlA);

            const instanceIdA = ControlInstanceStore.controls.get(0).instanceId;

            optimisticallyRemoveControl(instanceIdA, dirty);
            failToRemoveControl(dirty);

            expect(ControlInstanceStore.controls.count()).toEqual(1);
            expect(ControlInstanceStore.controls.get(0).dirty).toBeFalsy();
        });
    });

    describe('rename a control tests', () => {
        it('renames a control optimistically', () => {
            const dirty = shortId.generate();

            optimisticallyAddControl(optimisticTestControlA);
            successfullyAddControl(actualTestControlA);

            const newName = 'RenamedControlA';
            const instanceIdA = ControlInstanceStore.controls.get(0).instanceId;

            optimisticallyRenameControl(instanceIdA, newName, dirty);

            expect(ControlInstanceStore.controls.get(0).name).toEqual(newName);
            expect(ControlInstanceStore.controls.get(0).dirty).toEqual(dirty);
        });

        it('renames the right control successfully on actual successfull rename', () => {
            const dirty = shortId.generate();

            optimisticallyAddControl(optimisticTestControlA);
            successfullyAddControl(actualTestControlA);

            optimisticallyAddControl(optimisticTestControlB);
            successfullyAddControl(actualTestControlB);

            const newName = 'RenamedControlB';
            const instanceIdB = ControlInstanceStore.controls.get(1).instanceId;

            optimisticallyRenameControl(instanceIdB, newName, dirty);
            successfullyRenameControl(newName, dirty);

            expect(ControlInstanceStore.controls.get(1).name).toEqual(newName);
            expect(ControlInstanceStore.controls.get(1).dirty).toBeFalsy();
        });

        it('ignores non existing instance', () => {
            optimisticallyAddControl(optimisticTestControlA);
            successfullyAddControl(actualTestControlA);

            const newName = 'RenamedControlB';
            const nonExistingInstanceId = 'ThisIdDoesNotExist';
            const controlsBeforeRename = ControlInstanceStore.controls;

            optimisticallyRenameControl(nonExistingInstanceId, newName);

            const controlsAfterRename = ControlInstanceStore.controls;

            expect(controlsBeforeRename).toEqual(controlsAfterRename);
        });

        it('cancels renaming a control on failed rename of control', () => {
            const dirty = shortId.generate();

            optimisticallyAddControl(optimisticTestControlA);
            successfullyAddControl(actualTestControlA);

            const newName = 'RenamedControlA';
            const oldName = optimisticTestControlA.name;
            const instanceIdA = ControlInstanceStore.controls.get(0).instanceId;

            optimisticallyRenameControl(instanceIdA, newName, dirty);
            failToRenameControl(oldName, dirty);

            expect(ControlInstanceStore.controls.get(0).name).toEqual(oldName);
            expect(ControlInstanceStore.controls.get(0).dirty).toBeFalsy();
        });
    });

    function optimisticallyAddControl(control) {
        const {typeId, controlName, dirty} = control;
        ControlInstanceActions.addControlOptimistic(typeId, controlName, dirty);
        jasmine.clock().tick(jasmine.DEFAULT_TIMEOUT_INTERVAL);
    }

    function successfullyAddControl(control) {
        const {instanceId, dirty} = control;
        ControlInstanceActions.addControlCompleted(instanceId, dirty);
        jasmine.clock().tick(jasmine.DEFAULT_TIMEOUT_INTERVAL);
    }

    function failToAddControl(dirty) {
        ControlInstanceActions.addControlFailed(dirty);
        jasmine.clock().tick(jasmine.DEFAULT_TIMEOUT_INTERVAL);
    }

    function optimisticallyRemoveControl(instanceId, dirty) {
        ControlInstanceActions.removeControlOptimistic(instanceId, dirty);
        jasmine.clock().tick(jasmine.DEFAULT_TIMEOUT_INTERVAL);
    }

    function successfullyRemoveControl(dirty) {
        ControlInstanceActions.removeControlCompleted(dirty);
        jasmine.clock().tick(jasmine.DEFAULT_TIMEOUT_INTERVAL);
    }

    function failToRemoveControl(dirty) {
        ControlInstanceActions.removeControlFailed(dirty);
        jasmine.clock().tick(jasmine.DEFAULT_TIMEOUT_INTERVAL);
    }

    function optimisticallyRenameControl(instanceId, newName, dirty) {
        ControlInstanceActions.renameControlOptimistic(instanceId, newName, dirty);
        jasmine.clock().tick(jasmine.DEFAULT_TIMEOUT_INTERVAL);
    }

    function successfullyRenameControl(newName, dirty) {
        ControlInstanceActions.renameControlCompleted(newName, dirty);
        jasmine.clock().tick(jasmine.DEFAULT_TIMEOUT_INTERVAL);
    }

    function failToRenameControl(oldName, dirty) {
        ControlInstanceActions.renameControlFailed(oldName, dirty);
        jasmine.clock().tick(jasmine.DEFAULT_TIMEOUT_INTERVAL);
    }
});
