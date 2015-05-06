import Immutable from 'immutable';
import ParameterAccessLevels from './parameter-access-levels';
import UserLevels from '../shared/user-levels';

export default Immutable.Record({
    controlInstanceId: null,
    parameterId: null,
    name: null,
    value: null,
    unit: null,
    dirty: null,
    isSet: false,
    [UserLevels.user]: ParameterAccessLevels.readOnly,
    [UserLevels.service]: ParameterAccessLevels.readOnly,
    [UserLevels.developer]: ParameterAccessLevels.readOnly
});