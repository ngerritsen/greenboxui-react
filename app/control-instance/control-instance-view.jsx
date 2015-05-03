import React from 'react';
import Immutable from 'immutable';
import AutoListenerMixin from '../shared/auto-listener-mixin';
import TranslationMixin from '../translation/translation-mixin';
import ControlInstanceStore from './control-instance-store';
import ControlInstanceActions from './control-instance-actions';
import ControlInstanceAddTool from './control-instance-add-tool';
import Grid from '../shared/grid/grid';
import Slab from '../shared/slab';
import GridCellTypes from '../shared/grid/grid-cell-types';
import IconTypes from '../shared/icon-types';

export default React.createClass({
    mixins: [AutoListenerMixin, TranslationMixin],
    translations: ['type', 'instanceId', 'name', 'delete'],
    getInitialState() {
        return { controls: ControlInstanceStore.getState().controls }
    },
    componentDidMount() {
        this.listenToAuto(ControlInstanceStore);
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
            { title: this.getTranslation('type'), columns: 3, id: 'typeName' },
            { title: this.getTranslation('instanceId'), columns: 3, id: 'instanceId', unique: true },
            { title: this.getTranslation('name'), columns: 4, id: 'name', type: GridCellTypes.editable, handler: this._handleEditControlName },
            { title: this.getTranslation('delete'), columns: 2, id: 'delete',
                type: GridCellTypes.action,
                actionIcon: IconTypes.remove,
                handler: this._handleDeleteControl,
                sort: false
            }
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