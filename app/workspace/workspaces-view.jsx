import React from 'react';
import Reflux from 'reflux';

import WorkspaceView from './workspace-view';
import WorkspaceSelector from './workspace-selector';
import WorkspaceStore from './workspace-store';

export default React.createClass({
    mixins: [
        Reflux.connect(WorkspaceStore, 'workspaces')
    ],
    getInitialState() {
        return { workspaces: WorkspaceStore.workspaces }
    },
    _getWorkspaceId() {
        const id = this.props.params.id;
        if(id === 'default') {
            return this.state.workspaces.get(0).id;
        }
        return id;
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