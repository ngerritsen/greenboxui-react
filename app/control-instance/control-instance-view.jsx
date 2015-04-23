import React from 'react';
import Immutable from 'immutable';

import ControlInstanceStore from './control-instance-store';
import ControlInstanceActions from './control-instance-actions';

import ControlInstanceAddTool from './control-instance-add-tool';
import Grid from '../shared/grid/grid';
import Slab from '../shared/slab';

export default React.createClass({
    getInitialState() {
        return { controls: Immutable.List() }
    },
    componentDidMount() {
        ControlInstanceStore.listen(this._onChange);
        this._onChange();
    },
    componentWillUnmount() {
        ControlInstanceStore.unlisten(this._onChange)
    },
    _onChange() {
        const newControls = ControlInstanceStore.getState().controls;
        this.setState({ controls: newControls });
    },
    _handleEditControlName(newName, control) {
        const instanceId = control.instanceId;
        ControlInstanceActions.renameControl(instanceId, newName);
    },
    _handleDeleteControl(control) {
        ControlInstanceActions.removeControl(control.instanceId);
    },
    render() {
        const columnInfo = [
            { title: 'Type Id', columns: 3, id: 'typeId' },
            { title: 'Instance Id', columns: 3, id: 'instanceId', unique: true },
            { title: 'Name', columns: 4, id: 'name', type: 'editable', handler: this._handleEditControlName },
            { title: 'Delete', columns: 2, id: 'delete', type: 'delete', handler: this._handleDeleteControl, sort: false }
        ];

        return (
            <div>
                <Slab narrow={true}>
                    <ControlInstanceAddTool/>
                </Slab>
                <Slab>
                    <Grid
                        columnInfo={columnInfo}
                        data={this.state.controls.toArray()}
                    />
                </Slab>
            </div>
        );
    }
});