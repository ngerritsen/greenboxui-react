import About from './settings/about';
import AlarmView from './alarms/alarm-view';
import ConnectionView from './connections/connection-view';
import ControlInstanceView from './control-instance/control-instance-view';
import Development from './settings/development';
import ControlView from './control/controls-view';
import General from './settings/general';
import GraphView from './graphs/graph-view';
import IconTypes from './shared/icon-types';
import LicenseView from './license/license-view';
import LoggingView from './logging/logging-view';
import Workspace from './workspace/workspace';

export const routeConfig = [
    {
        title: 'graphs',
        name: 'graphs',
        path: '/',
        icon: IconTypes.graphs,
        handler: GraphView
    },
    {
        title: 'workspace',
        name: 'workspace',
        path: '/workspace',
        icon: IconTypes.workspace,
        handler: Workspace
    },
    {
        title: 'control',
        name: 'control',
        path: '/control',
        icon: IconTypes.control,
        handler: ControlView
    },
    {
        title: 'alarms',
        name: 'alarms',
        path: '/alarms',
        icon: IconTypes.alarm,
        handler: AlarmView,
        inMenu: false
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
                handler: General
            },
            {
                title: 'development',
                name: 'development',
                path: '/settings/development',
                icon: IconTypes.development,
                handler: Development
            },
            {
                title: 'logging',
                name: 'logging',
                path: '/settings/loggin',
                icon: IconTypes.logging,
                handler: LoggingView
            }
        ]
    }

];