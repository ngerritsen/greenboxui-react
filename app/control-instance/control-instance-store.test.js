import shortId from 'shortid';
import Immutable from 'immutable';
import ControlInstanceStore from './control-instance-store';
import ControlInstanceActions from './control-instance-actions';

describe('control instance store', () => {
    const dirtyIdA = shortId.generate();
    const dirtyIdB = shortId.generate();

    const optimisticTestControlA = { typeId: '123', name: 'TestControlA', dirty: dirtyIdA };
    const actualTestControlA = { typeId: '123', name: 'TestControlA', instanceId: shortId.generate(), dirty: dirtyIdA };
    const optimisticTestControlB = { typeId: '456', name: 'TestControlB', dirty: dirtyIdB };
    const actualTestControlB = { typeId: '456', name: 'TestControlB', instanceId: shortId.generate(), dirty: dirtyIdB };

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
            addControlOptimistic(optimisticTestControlA);

            expect(ControlInstanceStore.controls.count()).toEqual(1);
        });

        it('replaces optimistically added control with actual', () => {
            addControlOptimistic(optimisticTestControlA);
            addControlCompleted(actualTestControlA);
            expect(ControlInstanceStore.controls.count()).toEqual(1);
        });

        it('adds the right data to optimistic control', () => {
            addControlOptimistic(optimisticTestControlA);

            expect(ControlInstanceStore.controls.get(0).typeId).toEqual(optimisticTestControlA.typeId);
            expect(ControlInstanceStore.controls.get(0).name).toEqual(optimisticTestControlA.name);
            expect(ControlInstanceStore.controls.get(0).dirty).toEqual(optimisticTestControlA.dirty);
        });

        it('adds multiple controls', () => {
            addControlOptimistic(optimisticTestControlA);
            addControlOptimistic(optimisticTestControlB);

            addControlCompleted(actualTestControlA);
            addControlCompleted(actualTestControlB);

            expect(ControlInstanceStore.controls.count()).toEqual(2);
            expect(ControlInstanceStore.controls.get(0).instanceId).toEqual(actualTestControlA.instanceId);
            expect(ControlInstanceStore.controls.get(1).instanceId).toEqual(actualTestControlB.instanceId);
        });

        it('cancels addition of a control if addition failed', () => {
            addControlOptimistic(optimisticTestControlA);
            addControlFailed(dirtyIdA);

            expect(ControlInstanceStore.controls.count()).toEqual(0);
        });
    });

    describe('remove a control tests', () => {
        it('marks an optimistically removed control as dirty', () => {
            const dirtyId = shortId.generate();

            addControlOptimistic(optimisticTestControlA);
            addControlCompleted(actualTestControlA);

            const instanceIdToRemove = ControlInstanceStore.controls.get(0).instanceId;

            removeControlOptimistic(instanceIdToRemove, dirtyId);

            expect(ControlInstanceStore.controls.get(0).dirty).toEqual(dirtyId);
        });

        it('marks one and the right control as dirty from multiple controls', () => {
            const dirtyId = shortId.generate();

            addControlOptimistic(optimisticTestControlA);
            addControlCompleted(actualTestControlA);

            addControlOptimistic(optimisticTestControlB);
            addControlCompleted(actualTestControlB);

            const instanceIdA = ControlInstanceStore.controls.get(0).instanceId;

            removeControlOptimistic(instanceIdA, dirtyId);

            expect(ControlInstanceStore.controls.get(0).instanceId).toEqual(instanceIdA);
            expect(ControlInstanceStore.controls.get(0).dirty).toEqual(dirtyId);
        });

        it('actually removes optimistically removed control after successful removal', () => {
            const dirtyId = shortId.generate();

            addControlOptimistic(optimisticTestControlA);
            addControlCompleted(actualTestControlA);

            const instanceIdA = ControlInstanceStore.controls.get(0).instanceId;

            removeControlOptimistic(instanceIdA, dirtyId);
            removeControlCompleted(dirtyId);

            expect(ControlInstanceStore.controls.count()).toEqual(0);
        });

        it('cancels removal of a control if removal failed', () => {
            const dirtyId = shortId.generate();

            addControlOptimistic(optimisticTestControlA);
            addControlCompleted(actualTestControlA);

            const instanceIdA = ControlInstanceStore.controls.get(0).instanceId;

            removeControlOptimistic(instanceIdA, dirtyId);
            removeControlFailed(dirtyId);

            expect(ControlInstanceStore.controls.count()).toEqual(1);
            expect(ControlInstanceStore.controls.get(0).dirty).toBeFalsy();
        });
    });

    describe('rename a control tests', () => {
        it('renames a control optimistically', () => {
            const dirtyId = shortId.generate();

            addControlOptimistic(optimisticTestControlA);
            addControlCompleted(actualTestControlA);

            const newName = 'RenamedControlA';
            const instanceIdA = ControlInstanceStore.controls.get(0).instanceId;

            renameControlOptimistic(instanceIdA, newName, dirtyId);

            expect(ControlInstanceStore.controls.get(0).name).toEqual(newName);
            expect(ControlInstanceStore.controls.get(0).dirty).toEqual(dirtyId);
        });

        it('renames the right control successfully on actual successfull rename', () => {
            const dirtyId = shortId.generate();

            addControlOptimistic(optimisticTestControlA);
            addControlCompleted(actualTestControlA);

            addControlOptimistic(optimisticTestControlB);
            addControlCompleted(actualTestControlB);

            const newName = 'RenamedControlB';
            const instanceIdB = ControlInstanceStore.controls.get(1).instanceId;

            renameControlOptimistic(instanceIdB, newName, dirtyId);
            renameControlCompleted(newName, dirtyId);

            expect(ControlInstanceStore.controls.get(1).name).toEqual(newName);
            expect(ControlInstanceStore.controls.get(1).dirty).toBeFalsy();
        });

        it('ignores non existing instance', () => {
            addControlOptimistic(optimisticTestControlA);
            addControlCompleted(actualTestControlA);

            const newName = 'RenamedControlB';
            const nonExistingInstanceId = 'ThisIdDoesNotExist';
            const controlsBeforeRename = ControlInstanceStore.controls;

            renameControlOptimistic(nonExistingInstanceId, newName);

            const controlsAfterRename = ControlInstanceStore.controls;

            expect(controlsBeforeRename).toEqual(controlsAfterRename);
        });

        it('cancels renaming a control on failed rename of control', () => {
            const dirty = shortId.generate();

            addControlOptimistic(optimisticTestControlA);
            addControlCompleted(actualTestControlA);

            const newName = 'RenamedControlA';
            const oldName = optimisticTestControlA.name;
            const instanceIdA = ControlInstanceStore.controls.get(0).instanceId;

            renameControlOptimistic(instanceIdA, newName, dirty);
            renameControlFailed(oldName, dirty);

            expect(ControlInstanceStore.controls.get(0).name).toEqual(oldName);
            expect(ControlInstanceStore.controls.get(0).dirty).toBeFalsy();
        });
    });

    function addControlOptimistic(control) {
        const {typeId, name, dirty} = control;
        ControlInstanceActions.addControl.optimistic(typeId, name, dirty);
        jasmine.clock().tick(jasmine.DEFAULT_TIMEOUT_INTERVAL);
    }

    function addControlCompleted(control) {
        const {instanceId, dirty} = control;
        ControlInstanceActions.addControl.completed(instanceId, dirty);
        jasmine.clock().tick(jasmine.DEFAULT_TIMEOUT_INTERVAL);
    }

    function addControlFailed(dirty) {
        ControlInstanceActions.addControl.failed(dirty);
        jasmine.clock().tick(jasmine.DEFAULT_TIMEOUT_INTERVAL);
    }

    function removeControlOptimistic(instanceId, dirty) {
        ControlInstanceActions.removeControl.optimistic(instanceId, dirty);
        jasmine.clock().tick(jasmine.DEFAULT_TIMEOUT_INTERVAL);
    }

    function removeControlCompleted(dirty) {
        ControlInstanceActions.removeControl.completed(dirty);
        jasmine.clock().tick(jasmine.DEFAULT_TIMEOUT_INTERVAL);
    }

    function removeControlFailed(dirty) {
        ControlInstanceActions.removeControl.failed(dirty);
        jasmine.clock().tick(jasmine.DEFAULT_TIMEOUT_INTERVAL);
    }

    function renameControlOptimistic(instanceId, newName, dirty) {
        ControlInstanceActions.renameControl.optimistic(instanceId, newName, dirty);
        jasmine.clock().tick(jasmine.DEFAULT_TIMEOUT_INTERVAL);
    }

    function renameControlCompleted(newName, dirty) {
        ControlInstanceActions.renameControl.completed(newName, dirty);
        jasmine.clock().tick(jasmine.DEFAULT_TIMEOUT_INTERVAL);
    }

    function renameControlFailed(oldName, dirty) {
        ControlInstanceActions.renameControl.failed(oldName, dirty);
        jasmine.clock().tick(jasmine.DEFAULT_TIMEOUT_INTERVAL);
    }
});
