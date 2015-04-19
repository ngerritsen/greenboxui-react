import React from 'react';
import Slab from '../shared/slab';
import ControlInstanceActions from '../control-instance/control-instance-actions';
import ControlInstanceStore from '../control-instance/control-instance-store';
import ConnectionActions from '../connections/connection-actions';

export default React.createClass({
    _handleAddDummyConfiguration() {
        ControlInstanceActions.addControl('Pump', 'Pump1');
        ControlInstanceActions.addControl('Valve', 'Valve 1');
        ControlInstanceActions.addControl('Valve', 'Valve 2');
        ControlInstanceActions.addControl('Valve', 'Valve 3');
        ControlInstanceActions.addControl('Valve', 'Valve 4');
        ControlInstanceActions.addControl('Valve', 'Valve 5');
        ControlInstanceActions.addControl('Valve', 'Valve 6');
        ControlInstanceActions.addControl('Valve', 'Valve 7');
        ControlInstanceActions.addControl('Valve', 'Valve 8');
        ControlInstanceActions.addControl('Valve', 'Valve 9');
        ControlInstanceActions.addControl('Valve', 'Valve 10');
        ControlInstanceActions.addControl('Crop Section', 'Strawberry Cropsection');
        ControlInstanceActions.addControl('Crop Section', 'Pineapple Cropsection');
        ControlInstanceActions.addControl('Irrigation Strategy', 'Strawberry Strategy');
        ControlInstanceActions.addControl('Irrigation Strategy', 'Pineapple Strategy');
        ControlInstanceActions.addControl('Irrigation Stage', 'Strawberry Stage 1');
        ControlInstanceActions.addControl('Irrigation Stage', 'Strawberry Stage 2');
        ControlInstanceActions.addControl('Irrigation Stage', 'Pineapple Stage 1');
        ControlInstanceActions.addControl('Irrigation Stage', 'Pineapple Stage 2');
        ControlInstanceActions.addControl('Meteo', 'Meteo');

        const controls = ControlInstanceStore.getState().controls;

        ConnectionActions.addConnection(controls[0], controls[11]);
        ConnectionActions.addConnection(controls[0], controls[12]);
        ConnectionActions.addConnection(controls[11], controls[1]);
        ConnectionActions.addConnection(controls[11], controls[2]);
        ConnectionActions.addConnection(controls[11], controls[3]);
        ConnectionActions.addConnection(controls[11], controls[4]);
        ConnectionActions.addConnection(controls[11], controls[5]);
        ConnectionActions.addConnection(controls[12], controls[6]);
        ConnectionActions.addConnection(controls[12], controls[7]);
        ConnectionActions.addConnection(controls[12], controls[8]);
        ConnectionActions.addConnection(controls[12], controls[9]);
        ConnectionActions.addConnection(controls[12], controls[10]);
        ConnectionActions.addConnection(controls[13], controls[11]);
        ConnectionActions.addConnection(controls[14], controls[12]);
        ConnectionActions.addConnection(controls[13], controls[15]);
        ConnectionActions.addConnection(controls[13], controls[16]);
        ConnectionActions.addConnection(controls[14], controls[17]);
        ConnectionActions.addConnection(controls[14], controls[18]);
    },
    render() {
        return (
            <Slab>
                <div className="row setting">
                    <div className="small-6 medium-8 columns">
                        <span className="setting-description">Dummy configuration</span>
                    </div>
                    <div className="small-6 medium-4 columns">
                        <button className="button radius" onClick={this._handleAddDummyConfiguration}>Add</button>
                    </div>
                </div>
            </Slab>
        );
    }
});