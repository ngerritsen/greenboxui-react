import Immutable from 'immutable';
import shortId from 'shortid';
import Reflux from 'reflux';
import AlarmApiCalls from './alarm-api-calls';

let AlarmActions = Reflux.createActions({
    'raiseAlarm': {},
    'resetAlarm': {children: ['optimistic', 'completed', 'failed']}
});

AlarmActions.resetAlarm.listen(onResetAlarm);

function onResetAlarm(id) {
    const dirty = shortId.generate();
    this.optimistic(id, dirty);

    AlarmApiCalls.postResetAlarm()
        .then(() => this.completed(dirty))
        .catch(() => this.failed(dirty));
}

export default AlarmActions;