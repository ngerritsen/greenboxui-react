import GraphView from './graphs/graph-view';
import ControlInstanceView from './control-instance/control-instance-view';
import ConnectionView from './connections/connection-view';
import LicenseView from './license/license-view';
import ControlView from './control/controls-view';
import About from './settings/about';
import Development from './settings/development';

export const routeConfig = [{
        title: 'graphs',
        name: 'graphs',
        path: '/',
        icon: 'line-chart',
        handler: GraphView
    },
    {
        title: 'control',
        name: 'control',
        path: '/control',
        icon: 'sliders',
        handler: ControlView
    },
    {
        title: 'configure',
        name: 'configure',
        path: '/configure',
        icon: 'wrench',
        subRoutes: [
            {
                title: 'controlInstances',
                name: 'control-instances',
                path: '/configure/control-instances',
                icon: 'cubes',
                handler: ControlInstanceView
            },
            {
                title: 'connections',
                name: 'connections',
                path: '/configure/connections',
                icon: 'link',
                handler: ConnectionView
            },
            {
                title: 'license',
                name: 'license',
                path: '/configure/license',
                icon: 'key',
                handler: LicenseView
            }
        ]
    },
    {
        title: 'settings',
        name: 'settings',
        path: '/settings',
        icon: 'cog',
        subRoutes: [
            {
                title: 'about',
                name: 'about',
                path: '/settings/about',
                icon: 'info-circle',
                handler: About
            },
            {
                title: 'development',
                name: 'development',
                path: '/settings/development',
                icon: 'flask',
                handler: Development
            }
        ]
    }

];