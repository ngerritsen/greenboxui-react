import React from 'react';

export default React.createClass({
    propTypes: {
        handler: React.PropTypes.func,
        value: React.PropTypes.bool
    },
    _handleSwitch() {
        const newValue = this.props.value ? false : true;
        this.props.handler(newValue);
    },
    render() {
        return (
            <div className="switch round tiny">
                <input id="switch" type="checkbox" ref="switch" checked={this.props.value} readOnly onChange={this._handleSwitch}/>
                <label htmlFor="switch"></label>
            </div>
        );
    }
});