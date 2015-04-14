import React from 'react';
import ConnectionStore from './connection-store';
import ConnectionActions from './connection-actions';

import Grid from '../shared/grid/grid';
import Slab from '../shared/slab';

export default React.createClass({
    getInitialState() {
        return { connections: [] }
    },
    componentDidMount() {
        ConnectionStore.listen(this._onChange);
        this._onChange();
    },
    componentWillUnmount() {
        ConnectionStore.unlisten(this._onChange)
    },
    _onChange() {
        const newConnections = ConnectionStore.getState().connections;
        this.setState({ connections: newConnections });
    },
    _handleDeleteConnection(connection) {
        ConnectionActions.removeConnection(connection);
    },
    render() {
        const columnInfo = [
            { title: 'Source Type Id', columns: 2, id: 'sourceTypeId' },
            { title: 'Source Name', columns: 3, id: 'sourceName' },
            { title: 'Target Type Id', columns: 2, id: 'targetTypeId' },
            { title: 'Target Name', columns: 3, id: 'targetName' },
            { title: 'Delete', columns: 2, id: 'delete', cellType: 'delete', noSort: true, onDelete: this._handleDeleteConnection }
        ];

        return (
            <div>
                <Slab narrow={true}>

                </Slab>
                <Slab>
                    <Grid columnInfo={columnInfo} data={this.state.connections}></Grid>
                </Slab>
            </div>
        );
    }
});