import React from 'react';
import Immutable from 'immutable';
import Grid from '../shared/grid/grid';
import GridCellTypes from '../shared/grid/grid-cell-types';
import Slab from '../shared/slab';
import AutoListenerMixin from '../shared/auto-listener-mixin';
import TranslationMixin from '../translation/translation-mixin';
import LoggingStore from './logging-store';
import LogLevels from './log-levels';


export default React.createClass({
    mixins: [AutoListenerMixin, TranslationMixin],
    translations: [],
    getInitialState() {
        return { logging: Immutable.List() }
    },
    componentDidMount() {
        this.listenToAuto(LoggingStore);
    },
    render() {
        const columnInfo = [
            { title: this.getTranslation('level'), columns: 2, id: 'level' },
            { title: this.getTranslation('date'), columns: 2, id: 'date', type: GridCellTypes.date },
            { title: this.getTranslation('message'), columns: 8, id: 'message' },
            { title: 'id', id: 'id', unique: true, show: false }
        ];

        return (
            <div>
                <Slab>
                    <Grid
                        columnInfo={columnInfo}
                        data={this.state.logging.toArray()}
                    />
                </Slab>
            </div>
        );
    }
});