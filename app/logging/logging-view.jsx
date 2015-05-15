import React from 'react';
import Reflux from 'reflux';
import Immutable from 'immutable';

import Grid from '../shared/grid/grid';
import GridCellTypes from '../shared/grid/grid-cell-types';
import LoggingStore from './logging-store';
import LogLevels from './log-levels';
import Slab from '../shared/slab';
import SelectionBox from '../shared/selection-box';
import TranslationMixin from '../translation/translation-mixin';
import Translator from '../translation/translator';


export default React.createClass({
    displayName: 'Logging',
    mixins: [
        TranslationMixin,
        Reflux.connect(LoggingStore, 'logging')
    ],
    translations: ['level', 'date', 'message'],
    getInitialState() {
        return {
            logging: LoggingStore.logging,
            show: {
                info: true,
                warning: true,
                error: true
            }
        }
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
                    <form>
                        <div className="row">
                            <div className="small-12 medium-4 columns">
                                <input id="show-info" type="checkbox"/>
                                <label for="show-info">
                                    <Translator id="showInfo"/>
                                </label>
                            </div>
                            <div className="small-12 medium-4 columns">
                                <input id="show-warnings" type="checkbox"/>
                                <label for="show-warnings">
                                    <Translator id="showWarnings"/>
                                </label>
                            </div>
                            <div className="small-12 medium-4 columns">
                                <input id="show-errors" type="checkbox"/>
                                <label for="show-errors">
                                    <Translator id="showErrors"/>
                                </label>
                            </div>
                        </div>
                    </form>
                </Slab>
                <Slab>
                    <Grid
                        columnInfo={columnInfo}
                        data={this.state.logging.toArray()}
                        pagination={20}
                    />
                </Slab>
            </div>
        );
    }
});