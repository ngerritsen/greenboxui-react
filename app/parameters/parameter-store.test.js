import AltApp from '../core/alt-app';
import shortId from 'shortid';
import ParameterStore from './parameter-store';
import ParameterActions from './parameter-actions';
import ParameterServerActions from './parameter-server-actions';

describe('parameter store', () => {

    const controlInstanceIdA = shortId.generate();
    const controlInstanceIdB = shortId.generate();

    const parameterIdA = shortId.generate();
    const parameterIdB = shortId.generate();

    afterEach(() => AltApp.flush());

    it('registers a parameter', () => {
        registerParameter(controlInstanceIdA, parameterIdA);

        expect(ParameterStore.getState().parameters.count()).toEqual(1);
        expect(ParameterStore.getState().parameters.get(0).controlInstanceId).toEqual(controlInstanceIdA);
        expect(ParameterStore.getState().parameters.get(0).parameterId).toEqual(parameterIdA);
    });

    it('registers an multiple parameters', () => {
        registerParameter(controlInstanceIdA, parameterIdA);
        registerParameter(controlInstanceIdB, parameterIdA);
        registerParameter(controlInstanceIdB, parameterIdB);

        expect(ParameterStore.getState().parameters.count()).toEqual(3);
    });

    it('does not register an existing parameter', () => {
        registerParameter(controlInstanceIdA, parameterIdA);
        registerParameter(controlInstanceIdA, parameterIdA);

        expect(ParameterStore.getState().parameters.count()).toEqual(1);
    });

    it('unregisters a parameter', () => {
        registerParameter(controlInstanceIdA, parameterIdA);
        unregisterParameter(controlInstanceIdA, parameterIdA);

        expect(ParameterStore.getState().parameters.count()).toEqual(0);
    });

    it('optimistically sets a parameter value', () => {
        const newValue = 3;
        const dirtyId = shortId.generate();

        registerParameter(controlInstanceIdA, parameterIdA);
        setParameterOptimistic(controlInstanceIdA, parameterIdA, newValue, 0, dirtyId);
        expect(ParameterStore.getState().parameters.get(0).value).toEqual(newValue);
        expect(ParameterStore.getState().parameters.get(0).dirty).toEqual(dirtyId);

    });

    it('actually sets a parameter value on success', () => {
        const newValue = 5;
        const dirtyId = shortId.generate();

        registerParameter(controlInstanceIdA, parameterIdA);
        setParameterOptimistic(controlInstanceIdA, parameterIdA, newValue, 0, dirtyId);
        setParameterSuccess(dirtyId, newValue);
        expect(ParameterStore.getState().parameters.get(0).value).toEqual(newValue);
        expect(ParameterStore.getState().parameters.get(0).dirty).toBeFalsy();
    });

    it('undos a parameter value change on failure', () => {
        const newValue = 4;
        const oldValue = 2;
        const dirtyId = shortId.generate();

        registerParameter(controlInstanceIdA, parameterIdA);
        setParameterOptimistic(controlInstanceIdA, parameterIdA, newValue, oldValue, dirtyId);
        setParameterFail(dirtyId, oldValue);
        expect(ParameterStore.getState().parameters.get(0).value).toEqual(oldValue);
        expect(ParameterStore.getState().parameters.get(0).dirty).toBeFalsy();
    });

    function registerParameter(controlInstanceId, parameterId) {
        AltApp.dispatcher.dispatch({
            action: ParameterActions.REGISTER_PARAMETER,
            data: { controlInstanceId: controlInstanceId, parameterId: parameterId }
        })
    }

    function unregisterParameter(controlInstanceId, parameterId) {
        AltApp.dispatcher.dispatch({
            action: ParameterActions.UNREGISTER_PARAMETER,
            data: { controlInstanceId: controlInstanceId, parameterId: parameterId }
        })
    }

    function setParameterOptimistic(controlInstanceId, parameterId, newValue, oldValue, dirtyId) {
        AltApp.dispatcher.dispatch({
            action: ParameterActions.SET_PARAMETER,
            data: { controlInstanceId: controlInstanceId, parameterId: parameterId, newValue: newValue, oldValue: oldValue, dirty: dirtyId }
        })
    }

    function setParameterSuccess(dirtyId, newValue) {
        AltApp.dispatcher.dispatch({
            action: ParameterServerActions.SET_PARAMETER_SUCCEEDED,
            data: { clean: dirtyId, newValue: newValue }
        })
    }

    function setParameterFail(dirtyId, oldValue) {
        AltApp.dispatcher.dispatch({
            action: ParameterServerActions.SET_PARAMETER_FAILED,
            data: { clean: dirtyId, oldValue: oldValue }
        })
    }
});
