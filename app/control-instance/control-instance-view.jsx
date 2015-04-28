import React from 'react';
import Immutable from 'immutable';
import ListenerMixin from 'alt/mixins/ListenerMixin';
import TranslationMixin from '../translation/translation-mixin';
import ControlInstanceStore from './control-instance-store';
import ControlInstanceActions from './control-instance-actions';
import ControlInstanceAddTool from './control-instance-add-tool';
import Grid from '../shared/grid/grid';
import Slab from '../shared/slab';

export default React.createClass({
    mixins: [ListenerMixin, TranslationMixin],
    translations: ['type', 'instanceId', 'name', 'delete'],
    getInitialState() {
        return { controls: Immutable.List() }
    },
    componentDidMount() {
        this.listenTo(ControlInstanceStore, this._onChange);
        this._onChange();
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
            { title: this.getTranslation('type'), columns: 3, id: 'typeName' },
            { title: this.getTranslation('instanceId'), columns: 3, id: 'instanceId', unique: true },
            { title: this.getTranslation('name'), columns: 4, id: 'name', type: 'editable', handler: this._handleEditControlName },
            { title: this.getTranslation('delete'), columns: 2, id: 'delete', type: 'delete', handler: this._handleDeleteControl, sort: false }
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