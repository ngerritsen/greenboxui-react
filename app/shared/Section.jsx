import React from 'react';
import classnames from 'classnames';

export default React.createClass({
    propTypes: {
        columns: React.PropTypes.number
    },
    render() {
        const classNames = classnames([
            'small-12',
            { [`medium-${this.props.columns}`] : this.props.columns },
            'columns',
            'content-section'
        ]);

        return (
            <section className={classNames}>
                {this.props.children}
            </section>
        );
    }
});