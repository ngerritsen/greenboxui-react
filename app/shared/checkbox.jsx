import React from 'react';

import Translator from '../translation/translator';

export default React.createClass({
    propTypes: {
        handler: React.PropTypes.func,
        value: React.PropTypes.bool,
        label: React.PropTypes.string,
        ref: React.PropTypes.string
    },
    _getRef() {
        return this.props.ref ? this.props.ref : 'switch';
    },
    _handleSwitch() {
        const newValue = this.props.value ? false : true;
        this.props.handler(newValue);
    },
    render() {
        const {value, label} = this.props;
        return (
            <div>
                <input id="switch" type="checkbox" ref={this._getRef()} checked={value} readOnly onChange={this._handleSwitch}/>
                <label htmlFor="switch">
                    <Translator id={label}/>
                </label>
            </div>
        );
    }
});