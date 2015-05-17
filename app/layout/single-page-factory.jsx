import React from 'react';
import Router from 'react-router';

import Content from '../shared/layout/content';
import Section from '../shared/layout/section';
import SideNav from '../shared/layout/side-nav';
import Slab from '../shared/layout/slab';
import TitleBar from '../shared/layout/title-bar';

const {RouteHandler, Link} = Router;

export default function singlePageFactory(title, icon, Component) {
    return React.createClass({
        render() {
            return (
                <Content>
                    <TitleBar title={title} icon={icon}/>
                    <Section>
                        <Component params={this.props.params}/>
                    </Section>
                </Content>
            );
        }
    });
}
