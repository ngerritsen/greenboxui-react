import React from 'react';
import Router from 'react-router';

import layoutFactory from './layout/layout-factory';
import singlePageFactory from './layout/single-page-factory';
import multiPageFactory from './layout/multi-page-factory';
import {routeConfig} from './routes';

let {Route, RouteHandler} = Router;

let internalRoutes = routeConfig.map((route) => {
    if(route.subRoutes) {
        const subRoutes = route.subRoutes.map((subRoute) => {
            return <Route
                name={subRoute.name}
                path={subRoute.path}
                handler={subRoute.handler}
                key={subRoute.name}
            />;
        });

        return (
            <Route
                name={route.name}
                path={route.path}
                handler={multiPageFactory(route.title, route.path, route.subRoutes)}
                key={route.name}
            >
                {subRoutes}
            </Route>
        );
    }
    else {
        return <Route
            name={route.name}
            path={route.path}
            handler={singlePageFactory(route.title, route.icon, route.handler)}
            key={route.name}
        />;
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
