import React from 'react';
import Immutable from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';

import SelectionBox from '../shared/interaction/selection-box';
import Switch from '../shared/interaction/switch';
import SettingTypes from './setting-types';
import Translator from '../translation/translator';

export default React.createClass({
    propTypes: {
        label: React.PropTypes.string.isRequired,
        type: React.PropTypes.string,
        handler: React.PropTypes.func,
        actionLabel: React.PropTypes.string,
        value: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
        options: ImmutablePropTypes.listOf(React.PropTypes.shape({
            label: React.PropTypes.string,
            value: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number])
        })),
        defaultValue: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number, React.PropTypes.bool])
    },
    getDefaultProps() {
        return { type: SettingTypes.info }
    },
    render() {
        const {value, handler, actionLabel, options, defaultValue} = this.props;
        console.log(`default value: ${defaultValue}`);
        let setting = '';
        const {type, label} = this.props;

        if(type === SettingTypes.info) {
            setting = <span className="setting-value">{value}</span>;
        }
        else if(type === SettingTypes.action) {
            setting = <button className="button radius" onClick={handler}><Translator id={actionLabel}/></button>
        }
        else if(type === SettingTypes.selection) {
            console.log()
            setting = <SelectionBox options={options} handler={handler} defaultValue={defaultValue}/>
        }
        else if(type === SettingTypes.onOff) {
            setting = <Switch value={defaultValue} handler={handler}/>
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