import React from 'react';
import Router from 'react-router';

import Content from '../shared/content';
import Section from '../shared/section';
import SideNav from '../shared/side-nav';

const {RouteHandler, Link} = Router;

export default function multiPageFactory(title, link, subNavs) {
    return React.createClass({
        statics: {
            willTransitionTo: function (transition, params) {
                if (transition.path === link) {
                    transition.redirect(subNavs[0].path, params);
                }
            }
        },
        render() {
            return (
                <Content>
                    <Section columns={2}>
                        <SideNav items={subNavs}/>
                    </Section>
                    <Section columns={10}>
                        <RouteHandler/>
                    </Section>
                </Content>
            );
        }
    });
}
