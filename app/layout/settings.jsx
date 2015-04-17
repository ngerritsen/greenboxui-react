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
            if (transition.path === '/settings') {
                transition.redirect('/settings/about', params);
            }
        }
    },
    render() {
        const navItems = [
            {icon: 'info-circle', link: 'about', title: 'About'}
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