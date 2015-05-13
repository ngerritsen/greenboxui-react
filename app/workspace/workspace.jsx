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
    mixins: [Reflux.connect(WorkspaceStore, 'workspace')],
    getInitialState() {
        return { workspace: WorkspaceStore.workspace }
    },
    render() {
        let worksheets =
            this.state.workspace.map((worksheet) => {
                const {view, id} = worksheet;
                return (
                    <Worksheet view={view} key={id}/>
                );
            })
            .push(<Worksheet key="worksheet-selector"/>);

        return (
            <div className="row">
                {worksheets}
            </div>
        );
    }
});