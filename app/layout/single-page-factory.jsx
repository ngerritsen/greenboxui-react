import React from 'react';
import Router from 'react-router';

import Content from '../shared/content';
import Section from '../shared/section';
import SideNav from '../shared/side-nav';
import Slab from '../shared/slab';
import TitleBar from '../shared/title-bar';

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
