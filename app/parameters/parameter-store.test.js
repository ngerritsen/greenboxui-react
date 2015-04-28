import AltApp from '../core/alt-app';
import shortId from 'shortid';
import ParameterStore from './parameter-store';
import ParameterActions from './parameter-actions';
import ParameterServerActions from './parameter-server-actions';

describe('parameter store', () => {

    afterEach(() => AltApp.flush());

    it('runs', () => {
        expect(ParameterStore).toBeDefined();
    });
});
