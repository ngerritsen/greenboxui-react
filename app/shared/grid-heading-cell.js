import React from 'react';

export default React.createClass({
    propTypes: {
        column: React.PropTypes.object.isRequired,
        onSortBy: React.PropTypes.func.isRequired
    },
    _handleSortByColumn(event) {
        const sortProperty = this.props.column.id;
        this.props.onSortBy(sortProperty);
    },
    render() {
        const cell = this.props.column;
        return (
            <div className={`grid-cell small-${cell.columns} columns clickable`} value={cell.id} onClick={this._handleSortByColumn}>
                <strong>{cell.title}</strong>
            </div>
        );
    }
});