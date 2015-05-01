import React from 'react';
import classnames from 'classnames';

export default React.createClass({
    propTypes: {
        type: React.PropTypes.string.isRequired,
        large: React.PropTypes.bool,
        fixedWidth: React.PropTypes.bool,
        clickable: React.PropTypes.bool
    },
    getDefaultProps() {
        return {
            large: false,
            fixedWidth: false
        };
    },
    render() {
        const {type, large, fixedWidth, clickable} = this.props;
        const classNames = classnames([
            'fa',
            `fa-${type}`,
            { 'fa-lg': large },
            { 'fa-fw': fixedWidth },
            { 'clickable': clickable }
        ]);
        return (
            <i className={classNames}></i>
        );
    }
});

//Current icon classes are from font-awesome:
//http://fortawesome.github.io/Font-Awesome/examples/