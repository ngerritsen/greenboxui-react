import Immutable from 'immutable';
import Reflux from 'reflux';
import shortId from 'shortid';

import WorkspaceActions from './workspace-actions';

export default Reflux.createStore({
    init() {
        this.workspace = Immutable.List();

        this.listenToMany(WorkspaceActions);
    },
    onAddWorksheet(view) {
        this.workspace = this.workspace.push({ view: view, id: shortId.generate() });
        this.trigger(this.workspace);
    }
});
