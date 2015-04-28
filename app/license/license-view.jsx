import React from 'react';
import Immutable from 'immutable';
import ListenerMixin from 'alt/mixins/ListenerMixin';
import TranslationMixin from '../translation/translation-mixin';
import Slab from '../shared/slab';
import Grid from '../shared/grid/grid';
import LicenseStore from './license-store';

export default React.createClass({
    mixins: [ListenerMixin, TranslationMixin],
    translations: ['controlTypeId', 'controlTypeName', 'total', 'used', 'usage'],
    getInitialState() {
        return {
            license: LicenseStore.getState().license
        };
    },
    componentDidMount() {
        this.listenTo(LicenseStore, this._onChange);
    },
    _onChange() {
        this.setState(LicenseStore.getState());
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
            { title: this.getTranslation('usage'), type: 'progress', columns: 3, id: 'usage', total: 'total', value: 'used' }
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