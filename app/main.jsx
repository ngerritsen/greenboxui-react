import React from 'react';
import Router from 'react-router';
import Layout from './layout/layout';
import Configure from './layout/configure';
import ControlInstanceView from './control-instance/control-instance-view';
import ConnectionView from './connections/connection-view';
import GraphView from './graphs/graph-view';
import Time from './shared/time/time';

let Route = Router.Route;
let DefaultRoute = Router.DefaultRoute;
let RouteHandler = Router.RouteHandler;

let routes = (
    <Route name="layout" handler={Layout}  path="/">
        <Route name="graphs" handler={GraphView} path="/"/>
        <Route name="configure" handler={Configure} path="/configure">
            <Route name="control-instances" handler={ControlInstanceView} path="/configure/control-instances"/>
            <Route name="connections" handler={ConnectionView} path="/configure/connections"/>
        </Route>
    </Route>
);

Router.run(routes, (Handler) => {
   React.render(<Handler/>, document.getElementById('greenbox-app'));
});
