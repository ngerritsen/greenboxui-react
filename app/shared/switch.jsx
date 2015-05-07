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
            <div className="switch round small">
                <input id="switch" type="checkbox" checked={this.props.value} onChange={this._handleSwitch}/>
                <label for="switch"></label>
            </div>
        );
    }
});