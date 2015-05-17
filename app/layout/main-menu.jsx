import React from 'react';
import {Link} from 'react-router';

import SideNav from '../shared/layout/side-nav';
import Translator from '../translation/translator';

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
                <SideNav items={this.props.navItems} />
            </aside>
        );
    }
});