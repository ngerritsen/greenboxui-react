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
        let worksheets = this.state.workspace.map((worksheet) => {
            const View =  worksheet.view;
            return (
                <Worksheet view={View} key={worksheet.id}/>
            );
        });
        worksheets = worksheets.push(
            <Worksheet key="empty-sheet"/>
        );

        return (
            <div className="row">
                {worksheets}
            </div>
        );
    }
});