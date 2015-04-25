import React from 'react';
import Immutable from 'immutable';
import Slab from '../shared/slab';
import Grid from '../shared/grid/grid';
import LicenseStore from './license-store';

export default React.createClass({
    getInitialState() {
        return { license: Immutable.List() }
    },
    componentDidMount() {
        LicenseStore.listen(this._onChange);
        this._onChange();
    },
    componentWillUnmount() {
        LicenseStore.unlisten(this._onChange)
    },
    _onChange() {
        const newLicense = LicenseStore.getState().license;
        this.setState({ license: newLicense });
    },
    _getOnlyOwnedSlots() {
        console.log(this.state.license.toJS());
        return this.state.license.filter((slot) => slot.total > 0);
    },
    render() {
        const columnInfo = [
            { title: 'Control Type Id', columns: 4, id: 'controlTypeId', unique: true },
            { title: 'Total', columns: 2, id: 'total' },
            { title: 'Used', columns: 2, id: 'used' },
            { title: 'Usage', type: 'progress', columns: 4, id: 'usage', total: 'total', value: 'used' }
        ];

        return (
            <div>
                <Slab>
                    <Grid
                        columnInfo={columnInfo}
                        data={this._getOnlyOwnedSlots().toArray()}
                    />
                </Slab>
            </div>
        );
    }
});