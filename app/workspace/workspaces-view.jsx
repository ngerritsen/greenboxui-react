import React from 'react';
import Reflux from 'reflux';
import { Route, RouteHandler, Link } from 'react-router';

import WorkspaceView from './workspace-view';
import WorkspaceStore from './workspace-store';
import WorkspaceActions from './workspace-actions';

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
    _handleAddWorkspace(event) {
        event.preventDefault();

        WorkspaceActions.addWorkspace();
    },
    render() {
        const query = this.context.router.getCurrentQuery();
        let selectedWorkspaceId = query.workspaceId;
        if(!query.workspaceId) {
            selectedWorkspaceId = this.state.workspaces.get(0).id;
        }
        const tabs =
            this.state.workspaces.map((workspace, index) => {
                return (
                    <li className="tab-title" key={workspace.id}>
                        <Link to="workspace" query={{workspaceId: workspace.id}}>Workspace {index + 1}</Link>
                    </li>
                );
            })
            .push(
                <li className="tab-title" key="add-new-workspace">
                    <a href="" onClick={this._handleAddWorkspace}>Add</a>
                </li>
            );
        return (
            <div>
                <ul className="tabs">
                    {tabs}
                </ul>
                <WorkspaceView id={selectedWorkspaceId}/>
            </div>
        );
    }
});