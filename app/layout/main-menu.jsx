import React from 'react';
import Router from 'react-router';
import SideNav from '../shared/side-nav';

let Link = Router.Link;

export default React.createClass({
    render() {
        const navItems = [
            {icon: 'line-chart', link: 'graphs', title: 'Graphs'},
            {icon: 'wrench', link: 'configure', title: 'Configure'},
            {icon: 'cog', link: 'settings', title: 'Settings'}
        ];

        return (
            <aside className="left-off-canvas-menu main-menu">
                <SideNav title="Main Menu" items={navItems} />
            </aside>
        );
    }
});