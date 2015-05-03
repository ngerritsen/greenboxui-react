import React from 'react';
import AlarmStore from './alarm-store';
import AlarmActions from './alarm-actions';
import AutoListener from '../shared/auto-listener-mixin';
import TranslationMixin from '../translation/translation-mixin';
import Content from '../shared/content';
import Slab from '../shared/slab';
import Section from '../shared/section';
import Grid from '../shared/grid/grid';
import GridCellTypes from '../shared/grid/grid-cell-types';
import IconTypes from '../shared/icon-types';

export default React.createClass({
    mixins: [AutoListener, TranslationMixin],
    translations: ['id', 'date', 'message', 'reset'],
    getInitialState() {
        return { alarms: AlarmStore.getState().alarms };
    },
    componentDidMount() {
        this.listenToAuto(AlarmStore);
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
            <Content>
                <Section>
                    <Slab>
                        {console.log(this.state)}
                        <Grid
                            columnInfo={columnInfo}
                            data={this.state.alarms.toArray()}
                        />
                    </Slab>
                </Section>
            </Content>
        );
    }
});