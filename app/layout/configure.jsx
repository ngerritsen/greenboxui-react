import React from 'react';
import Router from 'react-router';

let RouteHandler = Router.RouteHandler;

export default React.createClass({
    render() {
        return (
            <div className="content row">
                <div className="small-2 columns content-section">
                    <ul className="side-nav" role="navigation" title="Configuration menu">
                        <li role="menuitem">
                            <a href="#/configure/control-instances">Control Instances</a>
                            <a href="#/configure/connections">Connections</a>
                        </li>
                    </ul>
                </div>
                <div className="small-10 columns content-section">
                    <RouteHandler/>
                </div>
            </div>
        );
    }
});