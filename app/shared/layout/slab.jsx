import React from 'react';
import classNames from 'classnames';

export default React.createClass({
    propTypes: {
        narrow: React.PropTypes.bool
    },
    render() {
        const slabClassNames = classNames(
            'slab',
            'clearfix',
            { 'slab-narrow': this.props.narrow }
        );
        return (
            <div className={slabClassNames}>
                {this.props.children}
            </div>
        );
    }
});