import React from 'react';

import Content from '../shared/content';
import ControlInstanceView from '../control-instance/control-instance-view';
import LicenseView from '../license/license-view'
import Section from '../shared/section';
import Translator from '../translation/translator';

export default React.createClass({
    render() {
        return (
            <Content>
                <Section columns="12">
                    <h4><Translator id="workspace"/></h4>
                </Section>
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