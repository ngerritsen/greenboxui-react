import React from 'react';
import GridHeadingCell from './grid-heading-cell';

export default React.createClass({
    _handleSortByColumn(sortProperty) {
        this.props.onSortBy(sortProperty);
    },
    render() {
        const cells = this.props.columnInfo.map((column) => {
            return <GridHeadingCell column={column} onSortBy={this._handleSortByColumn} key={column.id}/>;
        });

        return (
            <li className="grid-row grid-heading-row clearfix">
                {cells}
            </li>
        );
    }
});