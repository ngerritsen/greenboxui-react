import Immutable from 'immutable';
import Reflux from 'reflux';

import AlarmView from '../alarms/alarm-view';
import WorkspaceActions from './workspace-actions';

export default Reflux.createStore({
    init() {
        this.workspace = Immutable.List.of(
            { view: AlarmView }
        );

        this.listenToMany(WorkspaceActions);
    },
    onAddWorkspace(view) {
        this.workspace = this.workspace.push({ view: view });
        console.log(this.workspace);
        this.trigger(this.workspace);
    }
});
