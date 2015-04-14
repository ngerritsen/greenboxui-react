import React from 'react';
import Router from 'react-router';
import TopBar from './top-bar';
import MainMenu from './main-menu';

let RouteHandler = Router.RouteHandler;

export default React.createClass({
    render() {
        return (
            <div className="off-canvas-wrap" data-offcanvas>
                <div className="inner-wrap">

                    <MainMenu/>

                    <div className="container">
                        <TopBar/>
                        <RouteHandler/>
                    </div>

                    <a className="exit-off-canvas"></a>
                </div>
            </div>
        );
    }
});