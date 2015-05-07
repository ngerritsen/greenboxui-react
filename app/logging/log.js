import Immutable from 'immutable';
import LogLevels from './log-levels'

export default Immutable.Record({
    id: '',
    level: LogLevels.info,
    message: '',
    date: null
});