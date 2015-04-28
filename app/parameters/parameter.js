import Immutable from 'immutable';

export default Immutable.Record({
    controlInstanceId: null,
    parameterId: null,
    name: null,
    value: Math.round(Math.random() * 100)/10,
    unit: null,
    dirty: null,
    isSet: false
});