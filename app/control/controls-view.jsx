import React from 'react';
import Immutable from 'immutable';
import ListenerMixin from 'alt/mixins/ListenerMixin';
import TranslationMixin from '../translation/translation-mixin';
import ControlInstanceStore from '../control-instance/control-instance-store';
import ParameterStore from '../parameters/parameter-store';
import ParameterActions from '../parameters/parameter-actions';
import Grid from '../shared/grid/grid';
import Slab from '../shared/slab';
import Content from '../shared/content';
import Section from '../shared/section';

export default React.createClass({
    mixins: [ListenerMixin, TranslationMixin],
    translations: ['name', 'value', 'unit'],
    getInitialState() {
        return {
            controls: Immutable.List(),
            parameters: Immutable.List(),
            registeredParameters: Immutable.List()
        }
    },
    componentDidMount() {
        this.listenTo(ControlInstanceStore, this._onChangeControls);
        this.listenTo(ParameterStore, this._onChangeParams);
        this._onChangeControls();
        this._onChangeParams();
    },
    componentWillUnmount() {
        this.state.registeredParameters.forEach((parameter) => {
            ParameterActions.unregisterParameter(parameter.controlTypeId, parameter.parameterId);
        });
    },
    _onChangeControls() {
        const oldControls = this.state.controls;
        const newControls = ControlInstanceStore.getState().controls;
        this.setState({ controls: newControls });
        this._processControls(oldControls, newControls);
    },
    _onChangeParams() {
        this.setState({ parameters: ParameterStore.getState().parameters });
    },
    _processControls(oldControls, newControls) {
        const reallyNewControls = newControls.filter((newControl) => {
            const existing = oldControls.find((oldControl) => oldControl.instanceId !== newControl.instanceId);
            return existing ? false : true;
        });

        this._registerNewParametersFromControls(reallyNewControls);
    },
    _registerNewParametersFromControls(reallyNewControls) {
        let registeredParameters = Immutable.List();

        reallyNewControls.forEach((control) => {
            control.parameters.forEach((parameter) => {
                ParameterActions.registerParameter(control.instanceId, parameter.parameterId);
                registeredParameters = registeredParameters.push({
                    controlInstanceId: control.instanceId,
                    parameterInstanceId: parameter.parameterId
                });
            });
        });

        this.setState({ registeredParameters: registeredParameters });
    },
    render() {
        const columnInfo = [
            { title: this.getTranslation('name'), columns: 6, id: 'name' },
            { title: this.getTranslation('value'), columns: 3, id: 'value'},
            { title: this.getTranslation('unit'), columns: 3, id: 'unit'}
        ];

        return (
            <Content>
                <Section>
                    <Slab>
                        <Grid
                            columnInfo={columnInfo}
                            data={this.state.parameters.toArray()}
                        />
                    </Slab>
                </Section>
            </Content>
        );
    }
});