import React from 'react';
import Immutable from 'immutable';
import Translator from '../translation/translator';
import ImmutablePropTypes from 'react-immutable-proptypes';
import SelectionBox from '../shared/selection-box';
import Switch from '../shared/switch';
import SettingTypes from './setting-types';

export default React.createClass({
    propTypes: {
        label: React.PropTypes.string.isRequired,
        type: React.PropTypes.string,
        handler: React.PropTypes.func,
        actionLabel: React.PropTypes.string,
        value: React.PropTypes.oneOfType(React.PropTypes.string, React.PropTypes.number),
        options: ImmutablePropTypes.listOf(React.PropTypes.shape({
            label: React.PropTypes.string,
            value: React.PropTypes.oneOfType(React.PropTypes.string, React.PropTypes.number)
        })),
        defaultValue: React.PropTypes.oneOfType(React.PropTypes.string, React.PropTypes.number)
    },
    getDefaultProps() {
        return { type: SettingTypes.info }
    },
    render() {
        let setting = '';
        const {type, label} = this.props;

        if(type === SettingTypes.info) {
            setting = <span className="setting-value">{this.props.value}</span>;
        }
        else if(type === SettingTypes.action) {
            setting = <button className="button radius" onClick={this.props.handler}><Translator id={this.props.actionLabel}/></button>
        }
        else if(type === SettingTypes.selection) {
            setting = <SelectionBox options={this.props.options} handler={this.props.handler} defaultValue={this.props.defaultValue}/>
        }
        else if(type === SettingTypes.onOff) {
            setting = <Switch value={this.props.defaultValue} handler={this.props.handler}/>
        }

        return (
            <div className="row setting">
                <div className="small-6 medium-8 columns setting-column">
                    <span className="setting-description"><Translator id={label}/></span>
                </div>
                <div className="small-6 medium-4 columns setting-column">
                    {setting}
                </div>
            </div>
        );
    }
});