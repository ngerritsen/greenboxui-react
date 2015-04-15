import React from 'react';
import Router from 'react-router';

let Link = Router.Link;

export default React.createClass({
    render() {
        return (
            <aside className="left-off-canvas-menu">
                <ul className="side-nav main-menu">
                    <li className="side-nav-item main-menu-item" role="menuitem">
                        <Link to="home" activeClassName="active">
                            <i className="fa fa-home fa-fw fa-lg"></i>&nbsp; Home
                        </Link>
                    </li>
                    <li className="side-nav-item main-menu-item" role="menuitem">
                        <Link to="configure" activeClassName="active">
                            <i className="fa fa-cogs fa-fw fa-lg"></i>&nbsp; Configure
                        </Link>
                    </li>
                </ul>
            </aside>
        );
    }
});