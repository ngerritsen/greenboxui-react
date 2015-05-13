import React from 'react/addons';
import GridRow from './grid-row';
import GridPagination from './grid-pagination';
import _ from 'underscore';
const PureRenderMixin = React.addons.PureRenderMixin;

export default React.createClass({
    mixins: [PureRenderMixin],
    propTypes: {
        columnInfo: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
        data: React.PropTypes.array.isRequired,
        pagination: React.PropTypes.number,
        searchParameter: React.PropTypes.string,
        searchBy: React.PropTypes.string,
        sortProperty: React.PropTypes.string,
        sortInversed: React.PropTypes.bool
    },
    getDefaultProps() {
        return {
            pagination: 0,
            searchParameter: '',
            searchBy: '',
            sortProperty: '',
            sortInversed: false
        };
    },
    getInitialState() {
        return { currentPage: 0 };
    },
    _handleChangePage(newPage) {
        this.setState({ currentPage: newPage });
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
        const {columnInfo, searchParameter, searchBy} = this.props;
        const formattedSearchParameter = String(searchParameter).toLowerCase();

        if(searchBy) {
            return this._searchCellData(rowData[searchBy], formattedSearchParameter)
        }
        else {
            for(let i = 0; i < columnInfo.length; i++) {
                let cellData = rowData[columnInfo[i].id];
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
        const {sortProperty, sortInversed} = this.props;
        let newRowData = rowData;

        if (sortProperty) {
            newRowData = _(rowData).sortBy((item) => item[sortProperty]);
        }
        if (sortInversed) {
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
    _getKey(rowData, index) {
        const uniqueId = this._getUniqueId();
        if(uniqueId && rowData[uniqueId]) {
            return rowData[uniqueId]
        }
        else if(rowData.dirty) {
            return rowData.dirty
        }
        return index;

    },
    _getCurrentPage(paginatedRows) {
        let currentPage = this.state.currentPage;

        if (paginatedRows.length - 1 > currentPage) {
            currentPage = paginatedRows.length - 1;
        }
        return currentPage;
    },
    render() {
        const {columnInfo, data, pagination} = this.props;
        let renderedPagination = '';
        let totalRowCount = 0;

        const sortedData = this._sortRowData(data);
        const filteredData = this._searchData(sortedData);

        let rowsToShow = filteredData.map((rowData, index) => {
            const key = this._getKey(rowData, index);
            totalRowCount++;
            return <GridRow
                columnInfo={columnInfo}
                data={rowData}
                key={key}
                reactKey={key}
            />;
        });

        if(pagination) {
            const paginatedRows = this._paginateRows(rowsToShow);
            let currentPage = this._getCurrentPage(paginatedRows);
            rowsToShow = paginatedRows[currentPage];

            renderedPagination = (
                <GridPagination
                    totalRowCount={totalRowCount}
                    pageRowCount={pagination}
                    onChangePage={this._handleChangePage}
                    currentPage={currentPage}
                />
            );
        }

        return (
            <div>
                <ul className="grid-body">
                    {rowsToShow}
                </ul>
                {renderedPagination}
            </div>
        );
    }
});