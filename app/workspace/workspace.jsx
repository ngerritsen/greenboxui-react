import React from 'react';

import Content from '../shared/content';
import ControlInstanceView from '../control-instance/control-instance-view';
import LicenseView from '../license/license-view'
import Section from '../shared/section';
import TitleBar from '../shared/title-bar';

export default React.createClass({
    render() {
        return (
            <div className="row uncollapse">
                <Section columns="6">
                    <LicenseView/>
                </Section>
                <Section columns="6">
                    <ControlInstanceView/>
                </Section>
            </div>
        );
    }
});