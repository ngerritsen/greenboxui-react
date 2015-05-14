import masonryMixin from 'react-masonry-mixin';
import React from 'react';
import Reflux from 'reflux';

import WorkspaceStore from './workspace-store';
import Worksheet from './worksheet';

export default React.createClass({
    propTypes: {
        id: React.PropTypes.string.isRequired
    },
    mixins: [
        masonryMixin('workspace', {
            transitionDuration: 0
        }),
        Reflux.connect(WorkspaceStore, 'workspaces')
    ],
    getInitialState() {
        return { workspaces: WorkspaceStore.workspaces }
    },
    render() {
        const workspace = this.state.workspaces.find((workspace) => workspace.id === this.props.id);
        const worksheets =
            workspace.worksheets.map((worksheet) => {
                const {view, id} = worksheet;
                return (
                    <Worksheet view={view} key={id}/>
                );
            })
            .push(<Worksheet workspaceId={workspaceId} key="worksheet-selector"/>);
        return (
            <div className="row" ref="workspace">
                {worksheets}
            </div>
        );
    }
});