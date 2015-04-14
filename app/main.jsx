import React from 'react';
import Router from 'react-router';
import Layout from './layout/layout';
import Configure from './layout/configure';
import ControlInstanceView from './control-instance/control-instance-view';
import CouplingView from './coupling/coupling-view';
import Time from './shared/time/time'

let Route = Router.Route;
let DefaultRoute = Router.DefaultRoute;
let RouteHandler = Router.RouteHandler;

let routes = (
    <Route name="layout" handler={Layout}  path="/">
        <Route name="home" handler={ControlInstanceView} path="/"/>
        <Route name="configure" handler={Configure} path="/configure">
            <DefaultRoute name="control-instance-view-default" handler={ControlInstanceView}/>
            <Route name="control-instance-view" handler={ControlInstanceView} path="/configure/control-instances"/>
            <Route name="connections-view" handler={CouplingView} path="/configure/coupling"/>
        </Route>
    </Route>
);

Router.run(routes, (Handler) => {
   React.render(<Handler/>, document.getElementById('greenbox-app'));
});
