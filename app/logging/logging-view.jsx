import React from 'react';
import Reflux from 'reflux';
import Immutable from 'immutable';

import Checkbox from '../shared/checkbox';
import Grid from '../shared/grid/grid';
import GridCellTypes from '../shared/grid/grid-cell-types';
import IconTypes from '../shared/icon-types';
import LoggingActions from '../logging/logging-actions';
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
    translations: ['level', 'date', 'message', 'delete'],
    getInitialState() {
        return {
            logging: LoggingStore.logging,
            info: true,
            warning: true,
            error: true
        }
    },
    _handleToggleInfo() {
        this.setState({info: !this.state.info});
    },
    _handleToggleWarning() {
        this.setState({warning: !this.state.warning});
    },
    _handleToggleError() {
        this.setState({error: !this.state.error});
    },
    _filterLogging() {
        const {logging, info, warning, error} = this.state;
        return logging.filter((log) => {
            if(log.level === LogLevels.info && !info) {
                return false;
            }
            else if(log.level === LogLevels.warning && !warning) {
                return false;
            }
            else if(log.level === LogLevels.error && !error) {
                return false;
            }
            return true;
        });
    },
    _handleFlushLogging(event) {
        event.preventDefault();

        LoggingActions.flushLogging();
    },
    _handleRemoveLog(context) {
        const {id} = context;

        LoggingActions.removeLog(id);
    },
    render() {
        const {info, warning, error} = this.state;
        const columnInfo = [
            { title: this.getTranslation('level'), columns: 2, id: 'level' },
            { title: this.getTranslation('date'), columns: 2, id: 'date', type: GridCellTypes.date },
            { title: this.getTranslation('message'), columns: 7, id: 'message' },
            { title: this.getTranslation('delete'), columns: 1, id: 'delete',
                type: GridCellTypes.action,
                actionIcon: IconTypes.remove,
                handler: this._handleRemoveLog,
                sort: false
            },
            { title: 'id', id: 'id', unique: true, show: false }
        ];

        const filteredLogging = this._filterLogging();

        return (
            <div>
                <Slab>
                    <form>
                        <div className="row">
                            <div className="small-12 medium-3 columns">
                                <Checkbox label="showInfo" ref="infoToggle" value={info} handler={this._handleToggleInfo}/>
                            </div>
                            <div className="small-12 medium-3 columns">
                                <Checkbox label="showWarnings" ref="warningToggle" value={warning} handler={this._handleToggleWarning}/>
                            </div>
                            <div className="small-12 medium-3 columns">
                                <Checkbox label="showErrors" ref="errorToggle" value={error} handler={this._handleToggleError}/>
                            </div>
                            <div className="small-12 medium-3 columns">
                                <button className="button radius full-width" ref="flushLoggingButton" onClick={this._handleFlushLogging}>
                                    <Translator id="flushLogging"/>
                                </button>
                            </div>
                        </div>
                    </form>
                </Slab>
                <Slab>
                    <Grid
                        columnInfo={columnInfo}
                        data={filteredLogging.toArray()}
                        pagination={20}
                    />
                </Slab>
            </div>
        );
    }
});