import React from 'react';
import Router from 'react-router';
import TopBar from './top-bar';

let RouteHandler = Router.RouteHandler;

export default React.createClass({
    render() {
        return (
            <div className="container">
                <TopBar/>
                <div className="content row">
                    <div className="small-2 columns content-section">
                        <ul className="side-nav" role="navigation" title="Link List">
                            <li role="menuitem">
                                <a href="#">Control Instances</a>
                            </li>
                            <li role="menuitem">
                                <a href="#/time">Other Page</a>
                            </li>
                        </ul>
                    </div>
                    <div className="small-10 columns content-section">
                        <RouteHandler/>
                    </div>
                </div>
            </div>
        );
    }
});