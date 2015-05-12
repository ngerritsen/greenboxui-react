import React from 'react';
import Reflux from 'reflux';

import Content from '../shared/content';
import ControlInstanceView from '../control-instance/control-instance-view';
import LicenseView from '../license/license-view'
import Section from '../shared/section';
import TitleBar from '../shared/title-bar';
import WorkspaceStore from './workspace-store';
import WorksheetSelector from './worksheet-selector';

export default React.createClass({
    mixins: [Reflux.connect(WorkspaceStore, 'workspace')],
    getInitialState() {
        return { workspace: WorkspaceStore.workspace }
    },
    render() {
        let worksheets = this.state.workspace.map((worksheet) => {
            const View =  worksheet.view;
            return (
                <Section columns="6" key={worksheet.id}>
                    <View/>
                </Section>
            );
        });
        worksheets = worksheets.push(
            <Section columns="6" key="worksheet-selector">
                <WorksheetSelector/>
            </Section>
        );

        return (
            <div className="row">
                {worksheets}
            </div>
        );
    }
});