import React from 'react';
import Router from 'react-router';
import TopBar from './top-bar';
import MainMenu from './main-menu';

let RouteHandler = Router.RouteHandler;

export default function layoutFactory(routes) {
    return React.createClass({
        render() {
            return (
                <div className="container">
                    <TopBar/>
                    <div className="off-canvas-wrap" data-offcanvas>
                        <div className="inner-wrap">
                            <MainMenu navItems={routes} />
                            <RouteHandler/>
                            <a className="exit-off-canvas"></a>
                        </div>
                    </div>
                </div>
            );
        }
    });
}
