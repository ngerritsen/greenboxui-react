import ImmutablePropTypes from 'react-immutable-proptypes';
import React from 'react';

import GridHeadingCell from './grid-heading-cell';

export default React.createClass({
    propTypes: {
        columnInfo: ImmutablePropTypes.listOf(React.PropTypes.object).isRequired,
        onSortBy: React.PropTypes.func.isRequired,
        sortProperty: React.PropTypes.string
    },
    getDefaultProps() {
        return { sortProperty: '' };
    },
    _handleSortByColumn(sortProperty, sortInversed) {
        this.props.onSortBy(sortProperty, sortInversed);
    },
    render() {
        const sortProperty = this.props.sortProperty;
        const cells = this.props.columnInfo.map((column) => {
            const {id, show} = column;
            if(show === false) {
                return '';
            }
            return <GridHeadingCell
                column={column}
                onSortBy={this._handleSortByColumn}
                key={id}
                sorted={id === sortProperty}/>;
        });

        return (
            <div className="grid-heading clearfix">
                {cells}
            </div>
        );
    }
});