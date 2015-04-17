import React from 'react';
import Router from 'react-router';
import layoutFactory from './layout/layout-factory';
import multiPageFactory from './layout/multi-page-factory';
import {routeConfig} from './routes';

let Route = Router.Route;
let RouteHandler = Router.RouteHandler;

let internalRoutes = routeConfig.map((route) => {
    if(route.subRoutes) {
        const subRoutes = route.subRoutes.map((subRoute) => {
            return <Route name={subRoute.name} handler={subRoute.handler} path={subRoute.path} key={subRoute.name}/>;
        });

        return (
            <Route
                name={route.name}
                key={route.name}
                path={route.path}
                handler={multiPageFactory(route.title, route.path, route.subRoutes)}
            >
                {subRoutes}
            </Route>
        );
    }
    else {
        return <Route name={route.name} handler={route.handler} path={route.path}  key={route.name}/>;
    }
});

let routes = (
    <Route name="layout" handler={layoutFactory(routeConfig)}  path="/">
        {internalRoutes}
    </Route>
);

Router.run(routes, (Handler) => {
   React.render(<Handler/>, document.getElementById('greenbox-app'));
});
