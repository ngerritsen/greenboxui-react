import GraphView from './graphs/graph-view';

import ControlInstanceView from './control-instance/control-instance-view';
import ConnectionView from './connections/connection-view';

import About from './settings/about';
import Development from './settings/development';

export const routeConfig = [{
        title: 'Graphs',
        name: 'graphs',
        path: '/',
        icon: 'line-chart',
        handler: GraphView
    },
    {
        title: 'Configure',
        name: 'configure',
        path: '/configure',
        icon: 'wrench',
        subRoutes: [
            {
                title: 'Control Instances',
                name: 'control-instances',
                path: '/configure/control-instances',
                icon: 'cubes',
                handler: ControlInstanceView
            },
            {
                title: 'Connections',
                name: 'connections',
                path: '/configure/connections',
                icon: 'link',
                handler: ConnectionView
            }
        ]
    },
    {
        title: 'Settings',
        name: 'settings',
        path: '/settings',
        icon: 'cog',
        subRoutes: [
            {
                title: 'About',
                name: 'about',
                path: '/settings/about',
                icon: 'info-circle',
                handler: About
            },
            {
                title: 'Development',
                name: 'development',
                path: '/settings/development',
                icon: 'flask',
                handler: Development
            }
        ]
    }

];