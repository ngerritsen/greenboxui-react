import React from 'react';
import Reflux from 'reflux';

import WorkspaceView from './workspace-view';
import WorkspaceSelector from './workspace-selector';
import WorkspaceStore from './workspace-store';

export default React.createClass({
    mixins: [
        Reflux.connect(WorkspaceStore, 'workspaces')
    ],
    contextTypes: {
        router: React.PropTypes.func.isRequired
    },
    getInitialState() {
        return { workspaces: WorkspaceStore.workspaces }
    },
    _getWorkspaceId() {
        const query = this.context.router.getCurrentQuery();
        const workspaceId = query.workspaceId;
        if (!workspaceId) {
            return this.state.workspaces.get(0).id;
        }
        else {
            return workspaceId;
        }
    },
    render() {
        const workspaceId = this._getWorkspaceId();
        return (
            <div>
                <WorkspaceSelector current={workspaceId} workspaces={this.state.workspaces}/>
                <WorkspaceView id={workspaceId}/>
            </div>
        );
    }
});