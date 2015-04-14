import React from 'react';
import CouplingStore from './coupling-store';
import CouplingActions from './coupling-actions';

import Grid from '../shared/grid/grid';
import Slab from '../shared/slab';

export default React.createClass({
    getInitialState() {
        return { couplings: [] }
    },
    componentDidMount() {
        CouplingStore.listen(this._onChange);
        this._onChange();
    },
    componentWillUnmount() {
        CouplingStore.unlisten(this._onChange)
    },
    _onChange() {
        const newCouplings = CouplingStore.getState().couplings;
        this.setState({ couplings: newCouplings });
    },
    _handleDeleteCoupling(coupling) {
        CouplingActions.removeCoupling(coupling);
    },
    render() {
        const columnInfo = [
            { title: 'Source Type Id', columns: 2, id: 'sourceTypeId' },
            { title: 'Source Name', columns: 3, id: 'sourceName' },
            { title: 'Target Type Id', columns: 2, id: 'targetTypeId' },
            { title: 'Target Name', columns: 3, id: 'targetName' },
            { title: 'Delete', columns: 2, id: 'delete', cellType: 'delete', noSort: true, onDelete: this._handleDeleteCoupling }
        ];

        return (
            <div>
                <Slab narrow={true}>

                </Slab>
                <Slab>
                    <Grid columnInfo={columnInfo} data={this.state.couplings}></Grid>
                </Slab>
            </div>
        );
    }
});