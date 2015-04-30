import React from 'react';
import Immutable from 'immutable';
import Translator from '../translation/translator';
import ImmutablePropTypes from 'react-immutable-proptypes';
import SelectionBox from '../shared/selection-box';
import SettingTypes from './setting-types';

export default React.createClass({
    propTypes: {
        label: React.PropTypes.string.isRequired,
        buttonLabel: React.PropTypes.string,
        value: React.PropTypes.oneOfType(React.PropTypes.string, React.PropTypes.number),
        type: React.PropTypes.string,
        handler: React.PropTypes.func,
        options: ImmutablePropTypes.listOf(React.PropTypes.shape({
            label: React.PropTypes.string,
            value: React.PropTypes.oneOfType(React.PropTypes.string, React.PropTypes.number)
        })),
        defaultValue: React.PropTypes.oneOfType(React.PropTypes.string, React.PropTypes.number)
    },
    getDefaultProps() {
        return { type: SettingTypes.Info }
    },
    render() {
        let setting = '';
        const {type, label} = this.props;

        if(type === SettingTypes.Info) {
            setting = <span className="setting-value">{this.props.value}</span>;
        }
        if(type === SettingTypes.Button) {
            setting = <button className="button radius" onClick={this.props.handler}><Translator id={this.props.buttonLabel}/></button>
        }
        else if(type === SettingTypes.Selection) {
            setting = <SelectionBox options={this.props.options} handler={this.props.handler} defaultValue={this.props.defaultValue}/>
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