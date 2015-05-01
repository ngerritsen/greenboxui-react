import React from 'react';

export default React.createClass({
    propTypes: {
        column: React.PropTypes.object.isRequired,
        onSortBy: React.PropTypes.func.isRequired,
        sorted: React.PropTypes.bool.isRequired
    },
    getInitialState() {
        return { sortInversed: true };
    },
    _handleSortByColumn(event) {
        const {onSortBy, column} = this.props;
        this.setState({ sortInversed: !this.state.sortInversed });
        onSortBy(column.id, this.state.sortInversed);
    },
    _capitalizeId(id) {
        return id.charAt(0).toUpperCase() + id.slice(1);
    },
    render() {
        const {column, sorted} = this.props;
        const cellTitle = column.title ? column.title : this._capitalizeId(column.id);

        if (column.sort === false) {
            return (
                <div className={`grid-cell small-${column.columns} columns`}>
                    <strong>{cellTitle}</strong>
                </div>
            );
        }

        let sortIcon = '';

        if(sorted && !this.state.sortInversed) {
            sortIcon = <i className="fa fa-sort-desc right fa-inline"></i>
        }
        else if (sorted) {
            sortIcon = <i className="fa fa-sort-asc right fa-inline"></i>
        }

        return (
            <div className={`grid-cell small-${column.columns} columns clickable`} onClick={this._handleSortByColumn}>
                <strong>{cellTitle}</strong>
                {sortIcon}
            </div>
        );
    }
});