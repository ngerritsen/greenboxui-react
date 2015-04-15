import React from 'react';
import ConnectionStore from './connection-store';
import ConnectionActions from './connection-actions';

import ConnectionAddTool from './connection-add-tool';

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
        ConnectionActions.removeConnection(connection.connectionId);
    },
    render() {
        const viewData = this.state.connections.map((connection) => {
            return {
                sourceTypeId: connection.sourceControl.typeId,
                sourceName: connection.sourceControl.name,
                targetTypeId: connection.targetControl.typeId,
                targetName: connection.targetControl.name,
                connectionId: connection.connectionId
            }
        });

        const columnInfo = [
            { title: 'Source Type Id', columns: 2, id: 'sourceTypeId' },
            { title: 'Source Name', columns: 3, id: 'sourceName' },
            { title: 'Target Type Id', columns: 2, id: 'targetTypeId' },
            { title: 'Target Name', columns: 3, id: 'targetName' },
            { title: 'Delete', columns: 2, id: 'delete', type: 'delete', handler: this._handleDeleteConnection, sort: false }
        ];

        return (
            <div>
                <Slab narrow={true}>
                    <ConnectionAddTool />
                </Slab>
                <Slab>
                    <Grid columnInfo={columnInfo} data={viewData}></Grid>
                </Slab>
            </div>
        );
    }
});