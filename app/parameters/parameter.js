import Immutable from 'immutable';
import ParameterAccessLevels from './parameter-access-levels';
export default Immutable.Record({
    controlInstanceId: null,
    parameterId: null,
    name: null,
    value: null,
    unit: null,
    dirty: null,
    isSet: false,
    userAccess: ParameterAccessLevels.readOnly,
    serviceAccess: ParameterAccessLevels.readOnly,
    developerAccess: ParameterAccessLevels.fullAccess
});