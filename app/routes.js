import Configure from './layout/configure';
import ControlInstanceView from './control-instance/control-instance-view';
import ConnectionView from './connections/connection-view';
import GraphView from './graphs/graph-view';
import Time from './shared/time/time';
import Settings from './layout/settings';
import AboutView from './settings/about';

export const routeConfig = [
    {
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
        subRoutes:
        [
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
        subRoutes:
        [
            {
                title: 'About',
                name: 'about',
                path: '/settings/about',
                icon: 'info-circle',
                handler: AboutView
            }
        ]
    }

];