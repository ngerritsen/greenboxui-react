import Immutable from 'immutable';
import React from 'react';
import Reflux from 'reflux';

import AlarmStore from './alarm-store';
import AlarmActions from './alarm-actions';
import Content from '../shared/content';
import Grid from '../shared/grid/grid';
import GridCellTypes from '../shared/grid/grid-cell-types';
import IconTypes from '../shared/icon-types';
import Slab from '../shared/slab';
import Section from '../shared/section';
import TranslationMixin from '../translation/translation-mixin';

export default React.createClass({
    displayName: 'Alarms',
    mixins: [
        TranslationMixin,
        Reflux.connect(AlarmStore, 'alarms')
    ],
    translations: ['id', 'date', 'message', 'reset'],
    getInitialState() {
        return { alarms: AlarmStore.alarms };
    },
    _handleResetAlarm(context) {
        const alarmId = context.id;
        AlarmActions.resetAlarm(alarmId);
    },
    render() {
        const columnInfo = [
            { title: this.getTranslation('id'), columns: 2, id: 'id', unique: true },
            { title: this.getTranslation('date'), type: GridCellTypes.date, columns: 2, id: 'date' },
            { title: this.getTranslation('message'), columns: 6, id: 'message'},
            { title: this.getTranslation('reset'), columns: 2, id: 'reset',
                type: GridCellTypes.action,
                actionIcon: IconTypes.resetAlarm,
                handler: this._handleResetAlarm
            }
        ];

        return (
            <Slab>
                <Grid
                    columnInfo={columnInfo}
                    data={this.state.alarms.toArray()}
                />
            </Slab>
        );
    }
});