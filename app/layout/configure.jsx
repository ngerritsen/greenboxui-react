import React from 'react';
import Router from 'react-router';
import Content from '../shared/content';
import Section from '../shared/section';
import SideNav from '../shared/side-nav';

let RouteHandler = Router.RouteHandler;
let Link = Router.Link;

export default React.createClass({
    statics: {
        willTransitionTo: function (transition, params) {
            if (transition.path === '/configure') {
                transition.redirect('/configure/control-instances', params);
            }
        }
    },
    render() {
        const navItems = [
            {icon: 'cubes', link: 'control-instances', title: 'Control Instances'},
            {icon: 'link', link: 'connections', title: 'Connections'}
        ];

        return (
            <Content>
                <Section columns={2}>
                    <SideNav title="Configure" items={navItems}/>
                </Section>
                <Section columns={10}>
                    <RouteHandler/>
                </Section>
            </Content>
        );
    }
});