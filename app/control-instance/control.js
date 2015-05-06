import Immutable from 'immutable';
import shortId from 'shortId';
import Parameter from '../parameters/parameter';
import ParameterAccessLevels from '../parameters/parameter-access-levels';
import UserLevels from '../shared/user-levels';

export default Immutable.Record({
    typeId: null,
    typeName: 'Unknown control type',
    instanceId: null,
    name: 'Unknown control instance',
    parameters: Immutable.List.of(
        new Parameter({ parameterId: 'measurement' }),
        new Parameter({ parameterId: 'setpoint' }),
        new Parameter({ parameterId: 'pBand' }),
        new Parameter({ parameterId: 'ioValue' })
    ),
    dirty: null
});