import masonryMixin from 'react-masonry-mixin';
import React from 'react';
import Reflux from 'reflux';

import Content from '../shared/content';
import ControlInstanceView from '../control-instance/control-instance-view';
import LicenseView from '../license/license-view'
import Section from '../shared/section';
import TitleBar from '../shared/title-bar';
import WorkspaceStore from './workspace-store';
import Worksheet from './worksheet';

export default React.createClass({
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
        let worksheets =
            this.state.workspaces.get(0).worksheets.map((worksheet) => {
                const {view, id} = worksheet;
                return (
                    <Worksheet view={view} key={id}/>
                );
            })
            .push(<Worksheet key="worksheet-selector"/>);

        return (
            <div className="row" ref="workspace">
                {worksheets}
            </div>
        );
    }
});