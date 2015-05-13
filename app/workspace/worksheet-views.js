import AlarmView from '../alarms/alarm-view';
import ConnectionView from '../connections/connection-view';
import ControlsView from '../control/controls-view';
import ControlInstanceView from '../control-instance/control-instance-view';
import GraphView from '../graphs/graph-view';
import LicenseView from '../license/license-view';
import LoggingView from '../logging/logging-view';

export default Object.freeze({
    Alarms: AlarmView,
    Connections: ConnectionView,
    Controls: ControlsView,
    ControlInstances: ControlInstanceView,
    Graph: GraphView,
    License: LicenseView,
    Logging: LoggingView
});