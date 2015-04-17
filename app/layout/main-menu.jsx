import React from 'react';
import Router from 'react-router';
import SideNav from '../shared/side-nav';

let Link = Router.Link;

export default React.createClass({
    propTypes: {
        navItems: React.PropTypes.arrayOf(React.PropTypes.shape({
            title: React.PropTypes.string.isRequired,
            name: React.PropTypes.string.isRequired,
            icon: React.PropTypes.string.isRequired
        })).isRequired
    },
    render() {
        return (
            <aside className="left-off-canvas-menu main-menu">
                <SideNav title="Main Menu" items={this.props.navItems} />
            </aside>
        );
    }
});