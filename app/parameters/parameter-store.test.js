import shortId from 'shortid';
import ParameterStore from './parameter-store';
import ParameterActions from './parameter-actions';

xdescribe('parameter store', () => {

    const controlInstanceIdA = shortId.generate();
    const controlInstanceIdB = shortId.generate();

    const parameterIdA = shortId.generate();
    const parameterIdB = shortId.generate();

    beforeEach(() => {
        ParameterStore.parameters = Immutable.List();
        jasmine.clock().install()
    });

    afterEach(() => {
        ParameterStore.parameters = Immutable.List();
        jasmine.clock().uninstall()
    });

    it('registers a parameter', () => {
        registerParameter(controlInstanceIdA, parameterIdA);

        expect(ParameterStore.parameters.count()).toEqual(1);
        expect(ParameterStore.parameters.get(0).controlInstanceId).toEqual(controlInstanceIdA);
        expect(ParameterStore.parameters.get(0).parameterId).toEqual(parameterIdA);
    });

    it('registers an multiple parameters', () => {
        registerParameter(controlInstanceIdA, parameterIdA);
        registerParameter(controlInstanceIdB, parameterIdA);
        registerParameter(controlInstanceIdB, parameterIdB);

        expect(ParameterStore.parameters.count()).toEqual(3);
    });

    it('does not register an existing parameter', () => {
        registerParameter(controlInstanceIdA, parameterIdA);
        registerParameter(controlInstanceIdA, parameterIdA);

        expect(ParameterStore.parameters.count()).toEqual(1);
    });

    it('unregisters a parameter', () => {
        registerParameter(controlInstanceIdA, parameterIdA);
        unregisterParameter(controlInstanceIdA, parameterIdA);

        expect(ParameterStore.parameters.count()).toEqual(0);
    });

    it('optimistically sets a parameter value', () => {
        const newValue = 3;
        const dirty = shortId.generate();

        registerParameter(controlInstanceIdA, parameterIdA);
        setParameterOptimistic(controlInstanceIdA, parameterIdA, newValue, 0, dirty);
        expect(ParameterStore.parameters.get(0).value).toEqual(newValue);
        expect(ParameterStore.parameters.get(0).dirty).toEqual(dirty);

    });

    it('actually sets a parameter value on success', () => {
        const newValue = 5;
        const dirty = shortId.generate();

        registerParameter(controlInstanceIdA, parameterIdA);
        setParameterOptimistic(controlInstanceIdA, parameterIdA, newValue, 0, dirty);
        setParameterSuccess(newValue, dirty);
        expect(ParameterStore.parameters.get(0).value).toEqual(newValue);
        expect(ParameterStore.parameters.get(0).dirty).toBeFalsy();
    });

    it('undos a parameter value change on failure', () => {
        const newValue = 4;
        const oldValue = 2;
        const dirty = shortId.generate();

        registerParameter(controlInstanceIdA, parameterIdA);
        setParameterOptimistic(controlInstanceIdA, parameterIdA, newValue, oldValue, dirty);
        setParameterFail(oldValue, dirty);
        expect(ParameterStore.parameters.get(0).value).toEqual(oldValue);
        expect(ParameterStore.parameters.get(0).dirty).toBeFalsy();
    });

    function registerParameter(controlInstanceId, parameterId) {
        ParameterActions.registerParameter(controlInstanceId, parameterId);
        jasmine.clock().tick(jasmine.DEFAULT_TIMEOUT_INTERVAL);
    }

    function unregisterParameter(controlInstanceId, parameterId) {
        ParameterActions.unregisterParameter(controlInstanceId, parameterId);
        jasmine.clock().tick(jasmine.DEFAULT_TIMEOUT_INTERVAL);
    }

    function setParameterOptimistic(controlInstanceId, parameterId, newValue, oldValue, dirty) {
        ParameterActions.setParameterOptimistic(controlInstanceId, parameterId, newValue, oldValue, dirty);
        jasmine.clock().tick(jasmine.DEFAULT_TIMEOUT_INTERVAL);
    }

    function setParameterSuccess(newValue, dirty) {
        ParameterActions.setParameterCompleted(newValue, dirty);
        jasmine.clock().tick(jasmine.DEFAULT_TIMEOUT_INTERVAL);
    }

    function setParameterFail(oldValue, dirty) {
        ParameterActions.setParameterFailed(oldValue, dirty);
        jasmine.clock().tick(jasmine.DEFAULT_TIMEOUT_INTERVAL);
    }
});
