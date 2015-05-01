import GraphView from './graphs/graph-view';
import ControlInstanceView from './control-instance/control-instance-view';
import ConnectionView from './connections/connection-view';
import LicenseView from './license/license-view';
import ControlView from './control/controls-view';
import About from './settings/about';
import Development from './settings/development';
import IconTypes from './shared/icon-types';

export const routeConfig = [{
        title: 'graphs',
        name: 'graphs',
        path: '/',
        icon: IconTypes.graphs,
        handler: GraphView
    },
    {
        title: 'control',
        name: 'control',
        path: '/control',
        icon: IconTypes.control,
        handler: ControlView
    },
    {
        title: 'configure',
        name: 'configure',
        path: '/configure',
        icon: IconTypes.configure,
        subRoutes: [
            {
                title: 'controlInstances',
                name: 'control-instances',
                path: '/configure/control-instances',
                icon: IconTypes.controls,
                handler: ControlInstanceView
            },
            {
                title: 'connections',
                name: 'connections',
                path: '/configure/connections',
                icon: IconTypes.connection,
                handler: ConnectionView
            },
            {
                title: 'license',
                name: 'license',
                path: '/configure/license',
                icon: IconTypes.license,
                handler: LicenseView
            }
        ]
    },
    {
        title: 'settings',
        name: 'settings',
        path: '/settings',
        icon: IconTypes.settings,
        subRoutes: [
            {
                title: 'about',
                name: 'about',
                path: '/settings/about',
                icon: IconTypes.info,
                handler: About
            },
            {
                title: 'general',
                name: 'general',
                path: '/settings/general',
                icon: IconTypes.settingsGeneral,
                handler: About
            },
            {
                title: 'development',
                name: 'development',
                path: '/settings/development',
                icon: IconTypes.development,
                handler: Development
            }
        ]
    }

];