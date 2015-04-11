import React from 'react';
import ControlInstanceStore from './control-instance-store';
import ControlInstanceActions from './control-instance-actions';
import ControlInstanceDeleteCell from './control-instance-delete-cell-view';
import ControlInstanceAddTool from './control-instance-add-tool-view';
import Grid from '../shared/grid-view.js';

export default React.createClass({
    getInitialState() {
        return { controls: [] }
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
    render() {
        const columnInfo = [
            { title: 'Type Id', columns: 3, id: 'typeId' },
            { title: 'Instance Id', columns: 3, id: 'instanceId', unique: true },
            { title: 'Name', columns: 4, id: 'name', editAble: true, onEdit: this._handleEditControlName },
            { title: 'Delete', columns: 2, id: 'delete', template: ControlInstanceDeleteCell, noSort: true }
        ];

        return (
            <div>
                <div className="slab slab-narrow row clearfix">
                    <div className="small-12 columns">
                        <ControlInstanceAddTool/>
                    </div>
                </div>

                <div className="slab row clearfix">
                    <div className="small-12 columns">
                        <Grid columnInfo={columnInfo} data={this.state.controls}></Grid>
                    </div>
                </div>
            </div>
        );
    }
});