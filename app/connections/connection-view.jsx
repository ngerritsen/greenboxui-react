import React from 'react';
import Immutable from 'immutable';
import ListenerMixin from 'alt/mixins/ListenerMixin';
import TranslationMixin from '../translation/translation-mixin';
import ConnectionStore from './connection-store';
import ConnectionActions from './connection-actions';
import ConnectionAddTool from './connection-add-tool';
import Grid from '../shared/grid/grid';
import Slab from '../shared/slab';

export default React.createClass({
    mixins: [ListenerMixin, TranslationMixin],
    translations: ['sourceType', 'sourceInstance', 'targetType', 'targetInstance', 'delete'],
    getInitialState() {
        return { connections: Immutable.List() }
    },
    componentDidMount() {
        this.listenTo(ConnectionStore, this._onChange);
        this._onChange();
    },
    _onChange() {
        const newConnections = ConnectionStore.getState().connections;
        this.setState({ connections: newConnections });
    },
    _handleDeleteConnection(connection) {
        ConnectionActions.removeConnection(connection.connectionId);
    },
    render() {
        const columnInfo = [
            { title: this.getTranslation('sourceType'), columns: 2, id: 'sourceControlTypeName' },
            { title: this.getTranslation('sourceInstance'), columns: 3, id: 'sourceControlName' },
            { title: this.getTranslation('targetType'), columns: 2, id: 'targetControlTypeName' },
            { title: this.getTranslation('targetInstance'), columns: 3, id: 'targetControlName' },
            { title: this.getTranslation('delete'), columns: 2, id: 'delete', type: 'delete', handler: this._handleDeleteConnection, sort: false }
        ];

        return (
            <div>
                <Slab narrow={true}>
                    <ConnectionAddTool/>
                </Slab>
                <Slab>
                    <Grid
                        columnInfo={columnInfo}
                        data={this.state.connections.toArray()}
                        pagination={10}
                    />
                </Slab>
            </div>
        );
    }
});