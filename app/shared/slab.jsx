import React from 'react';
import classNames from 'classnames';

export default React.createClass({
    propTypes: {
        narrow: React.PropTypes.bool
    },
    render() {
        const slabClassNames = classNames(
            'slab', 'row', 'clearfix',
            { 'slab-narrow': this.props.narrow }
        );
        return (
            <div className={slabClassNames}>
                <div className="small-12 columns">
                    {this.props.children}
                </div>
            </div>
        );
    }
});