import React from 'react';
import Router from 'react-router';

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
        return (
            <div className="content row">
                <div className="small-2 columns content-section">
                    <ul className="side-nav" role="navigation" title="Configuration menu">
                        <li className="side-nav-item" role="menuitem">
                            <Link to="control-instance-view" activeClassName="active">
                                <i className="fa fa-cubes fa-fw"></i>&nbsp; Control Instances
                            </Link>
                        </li>
                        <li className="side-nav-item" role="menuitem">
                            <Link to="connections-view" activeClassName="active">
                                <i className="fa fa-link fa-fw"></i>&nbsp; Connections
                            </Link>
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