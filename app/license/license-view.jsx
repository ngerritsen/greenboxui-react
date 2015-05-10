import React from 'react';
import Immutable from 'immutable';
import Reflux from 'reflux';
import TranslationMixin from '../translation/translation-mixin';
import Slab from '../shared/slab';
import Grid from '../shared/grid/grid';
import LicenseStore from './license-store';
import GridCellTypes from '../shared/grid/grid-cell-types';

export default React.createClass({
    mixins: [
        TranslationMixin,
        Reflux.connect(LicenseStore, 'license')
    ],
    translations: ['controlTypeId', 'controlTypeName', 'total', 'used', 'usage'],
    getInitialState() {
        return { license: Immutable.List() };
    },
    _getOnlyOwnedSlots() {
        return this.state.license.filter((slot) => slot.total > 0);
    },
    render() {
        const columnInfo = [
            { title: this.getTranslation('controlTypeId'), columns: 3, id: 'controlTypeId', unique: true },
            { title: this.getTranslation('controlTypeName'), columns: 4, id: 'controlTypeName', unique: true },
            { title: this.getTranslation('total'), columns: 1, id: 'total' },
            { title: this.getTranslation('used'), columns: 1, id: 'used' },
            { title: this.getTranslation('usage'), type: GridCellTypes.progress, columns: 3, id: 'usage', total: 'total', value: 'used' }
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