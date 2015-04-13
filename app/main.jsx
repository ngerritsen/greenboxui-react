import React from 'react';
import Router from 'react-router';
import Layout from './layout/layout';
import ControlInstanceView from './control-instance/control-instance-view';
import Time from './shared/time/time'

let Route = Router.Route;
let RouteHandler = Router.RouteHandler;



let routes = (
    <Route name="layout" handler={Layout}  path="/">
        <Route name="control-instance-view" handler={ControlInstanceView} path="/"/>
        <Route name="other-page" handler={Time} path="/time"/>
    </Route>
);

Router.run(routes, (Handler) => {
   React.render(<Handler/>, document.getElementById('greenbox-app'));
});
