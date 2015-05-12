import React from 'react';

import Content from '../shared/content';
import ControlInstanceView from '../control-instance/control-instance-view';
import LicenseView from '../license/license-view'
import Section from '../shared/section';
import TitleBar from '../shared/title-bar';

export default React.createClass({
    render() {
        return (
            <Content>
                <TitleBar title="workspace" icon="workspace"/>
                <Section columns="6">
                    <Section columns="12">
                        <LicenseView/>
                    </Section>
                </Section>
                <Section columns="6">
                    <Section columns="12">
                        <ControlInstanceView/>
                    </Section>
                </Section>
            </Content>
        );
    }
});