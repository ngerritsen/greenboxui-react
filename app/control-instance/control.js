import Immutable from 'immutable';

export default Immutable.Record({
    typeId: null,
    typeName: 'Unknown control type',
    instanceId: null,
    name: 'Unknown control instance',
    parameters: Immutable.List(),
    dirty: null
});