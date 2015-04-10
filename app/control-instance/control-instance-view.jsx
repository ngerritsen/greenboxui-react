import React from 'react';
import ControlInstanceStore from './control-instance-store';
import ControlInstanceActions from './control-instance-actions';
import ControlInstanceDeleteCell from './control-instance-delete-cell-view';
import ControlInstanceAddTool from './control-instance-add-tool-view';
import Grid from '../shared/grid-view.js';

export default React.createClass({
    getInitialState() {
        return { controls: [{
            typeId: '123',
            name: 'hello',
            instanceId: 'hello world'
        }] }
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
    render() {
        const columnInfo = [
            { title: 'Type Id', columns: 5, id: 'typeId' },
            { title: 'Name', columns: 5, id: 'name' },
            { title: 'Delete', columns: 2, id: 'name', template: ControlInstanceDeleteCell }
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