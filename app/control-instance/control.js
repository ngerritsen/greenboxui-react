import Immutable from 'immutable';
import shortId from 'shortId';

export default Immutable.Record({
    typeId: null,
    typeName: 'Unknown control type',
    instanceId: null,
    name: 'Unknown control instance',
    parameters: Immutable.List.of(
        new Parameter({ parameterId: shortId.generate(), name: 'Measurement' }),
        new Parameter({ parameterId: shortId.generate(), name: 'Setpoint' })
    ),
    dirty: null
});