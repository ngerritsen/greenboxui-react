import React from 'react';
import GridRow from './grid-row';
import GridPagination from './grid-pagination';
import _ from 'underscore';

export default React.createClass({
    propTypes: {
        columnInfo: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
        data: React.PropTypes.array.isRequired,
        pagination: React.PropTypes.number,
        searchParameter: React.PropTypes.string,
        searchBy: React.PropTypes.string,
        sortProperty: React.PropTypes.string,
        sortInversed: React.PropTypes.bool
    },
    getInitialState() {
        return {
            currentPage: 0
        }
    },
    _handleChangePage(newPage) {
        this.setState({
           currentPage: newPage
        });
    },
    _searchData(data) {
        if (this.props.searchParameter) {
            return data.filter((rowData) => {
                return this._searchRowData(rowData) ? true : false;
            });
        }
        else {
            return data;
        }

    },
    _searchRowData(rowData) {
        const formattedSearchParameter = String(this.props.searchParameter).toLowerCase();
        const columns = this.props.columnInfo;
        const searchBy = this.props.searchBy;

        if(searchBy) {
            return this._searchCellData(rowData[searchBy], formattedSearchParameter)
        }
        else {
            for(let i = 0; i < columns.length; i++) {
                let cellData = rowData[columns[i].id];
                if (this._searchCellData(cellData, formattedSearchParameter)) {
                    return true;
                }
            }
        }
    },
    _searchCellData(cellData, formattedSearchParameter) {
        const formattedCellData = String(cellData).toLowerCase();
        return formattedCellData.indexOf(formattedSearchParameter) > -1;

    },
    _sortRowData(rowData) {
        const sortProperty = this.props.sortProperty;
        let newRowData = rowData;

        if (sortProperty) {
            newRowData = _(rowData).sortBy((item) => item[sortProperty]);
        }
        if (this.props.sortInversed) {
            newRowData = newRowData.reverse();
        }
        return newRowData;
    },
    _paginateRows(rows) {
        return _(rows).groupBy((row, index) => {
            return Math.floor(index/this.props.pagination);
        });
    },
    _getUniqueId() {
        const uniqueColumn = _(this.props.columnInfo).find((column) => column.unique);
        return uniqueColumn ? uniqueColumn.id : false;
    },
    render() {
        let rowsToShow = [];
        let pagination = '';
        let totalRowCount = 0;
        const columnInfo = this.props.columnInfo;
        const uniqueId = this._getUniqueId();

        const sortedData = this._sortRowData(this.props.data);

        const filteredData = this._searchData(sortedData);

        rowsToShow = filteredData.map((rowData, index) => {
            const key = uniqueId ? rowData[uniqueId] : index;
            totalRowCount++;
            return <GridRow
                columnInfo={columnInfo}
                data={rowData}
                key={key}
                reactKey={key}
            />;
        });

        if(this.props.pagination) {
            let currentPage = this.state.currentPage;
            const paginatedRows = this._paginateRows(rowsToShow);
            if (paginatedRows.length - 1 > currentPage) {
                currentPage = paginatedRows.length - 1;
            }
            rowsToShow = paginatedRows[currentPage];

            pagination = (
                <GridPagination
                    totalRowCount={totalRowCount}
                    pageRowCount={this.props.pagination}
                    onChangePage={this._handleChangePage}
                    currentPage={currentPage}
                />
            );
        }

        return (
            <div>
                <ul className="grid">
                    {rowsToShow}
                </ul>
                {pagination}
            </div>
        );
    }
});