import React from 'react';
import Icon from '../../icon';

export default React.createClass({
    propTypes: {
        context: React.PropTypes.object.isRequired,
        onAction: React.PropTypes.func.isRequired,
        actionIcon: React.PropTypes.string.isRequired
    },
    _handleAction(event) {
        event.preventDefault();

        const {onAction, context} = this.props;
        onAction(context);
    },
    render() {
        return (
            <button className="icon-button" onClick={this._handleAction}>
                <Icon type={this.props.actionIcon}/>
            </button>
        );
    }
});