import React from 'react';
import Immutable from 'immutable';
import Reflux from 'reflux';
import TranslationMixin from '../translation/translation-mixin';
import ConnectionStore from './connection-store';
import ConnectionActions from './connection-actions';
import ConnectionAddTool from './connection-add-tool';
import Slab from '../shared/slab';
import Grid from '../shared/grid/grid';
import GridCellTypes from '../shared/grid/grid-cell-types';
import IconTypes from '../shared/icon-types';

export default React.createClass({
    mixins: [
        TranslationMixin,
        Reflux.connect(ConnectionStore, 'connections')
    ],
    translations: ['sourceType', 'sourceInstance', 'targetType', 'targetInstance', 'delete'],
    getInitialState() {
        return { connections: ConnectionStore.connections }
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
            { title: this.getTranslation('delete'), columns: 2, id: 'delete',
                type: GridCellTypes.action,
                actionIcon: IconTypes.remove,
                handler: this._handleDeleteConnection,
                sort: false
            }
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