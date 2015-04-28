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
});
