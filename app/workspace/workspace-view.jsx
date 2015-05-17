import Immutable from 'immutable';
import masonryMixin from 'react-masonry-mixin';
import React from 'react/addons';
import Reflux from 'reflux';

import Section from '../shared/layout/section';
import WorkspaceStore from './workspace-store';
import WorksheetSelector from './worksheet-selector';

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
        const workspaceId = workspace.id;
        const worksheets =
            workspace.worksheets.map((worksheet) => {
                const {view, id} = worksheet;
                const View = view;
                return (
                    <Section columns={6} key={id}>
                        <div className="slab worksheet clearfix">
                            <h5>{worksheet.name}</h5>
                            <View/>
                        </div>
                    </Section>
                );
            });
        const tools = Immutable.List.of((
            <Section columns={6} key="worksheet-selector">
                <WorksheetSelector workspaceId={workspaceId}/>
            </Section>
        ));
        const renderedSheets = React.addons.createFragment({
            worksheets: worksheets,
            tools: tools
        });

        return (
            <div className="row" ref="workspace">
                {renderedSheets}
            </div>
        );
    }
});