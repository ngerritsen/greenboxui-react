import React from 'react';
import AlarmStore from './alarm-store';
import AutoListener from '../shared/auto-listener-mixin';
import TranslationMixin from '../translation/translation-mixin';
import Content from '../shared/content';
import Slab from '../shared/slab';
import Section from '../shared/section';
import Grid from '../shared/grid/grid';

export default React.createClass({
    mixins: [AutoListener, TranslationMixin],
    translations: ['id', 'date', 'message'],
    getInitialState() {
        return { alarms: AlarmStore.getState().alarms };
    },
    componentDidMount() {
        this.listenToAuto(AlarmStore);
    },
    render() {
        const columnInfo = [
            { title: this.getTranslation('id'), columns: 3, id: 'id', unique: true },
            { title: this.getTranslation('date'), columns: 3, id: 'date' },
            { title: this.getTranslation('message'), columns: 6, id: 'message'}
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