import Immutable from 'immutable';
import Reflux from 'reflux';
import shortId from 'shortid';

import Workspace from './workspace';
import Worksheet from './worksheet';
import WorkspaceActions from './workspace-actions';

export default Reflux.createStore({
    init() {
        this.workspaces = Immutable.List.of(
            new Workspace({id: shortId.generate()})
        );

        this.listenToMany(WorkspaceActions);
    },
    onAddWorkspace() {
        const workspace = new Workspace({id: shortId.generate()});
        this.workspaces = this.workspaces.push(workspace);
        this.trigger(this.workspaces);
    },
    onAddWorksheet(workspaceId, view) {
        this.workspaces = this.workspaces.map((workspace) => {
            if(workspace.id === workspaceId) {
                const worksheet = new Worksheet({ view: view, id: shortId.generate(), name: view.displayName});
                const newWorksheets = workspace.worksheets.push(worksheet);
                workspace = workspace.set('worksheets', newWorksheets);
            }
            return workspace;
        });
        this.trigger(this.workspaces);
    }
});
