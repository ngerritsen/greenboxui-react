import React from 'react';
import classnames from 'classnames';

export default React.createClass({
    propTypes: {
        type: React.PropTypes.string.isRequired,
        large: React.PropTypes.bool,
        fixedWidth: React.PropTypes.bool,
        clickable: React.PropTypes.bool,
        inline: React.PropTypes.bool,
        notifications: React.PropTypes.number
    },
    getDefaultProps() {
        return {
            large: false,
            fixedWidth: false,
            notifications: 0
        };
    },
    render() {
        const {type, large, fixedWidth, clickable, inline, notifications} = this.props;
        let notificationSign = '';
        const classNames = classnames([
            'fa',
            `fa-${type}`,
            { 'fa-lg': large },
            { 'fa-fw': fixedWidth },
            { 'fa-inline': inline },
            { 'clickable': clickable }
        ]);
        if(notifications > 0) {
            notificationSign = <div className="notifications">{notifications}</div>
        }
        return (
            <i className={classNames}>{notificationSign}</i>
        );
    }
});

//Current icon classes are from font-awesome:
//http://fortawesome.github.io/Font-Awesome/examples/