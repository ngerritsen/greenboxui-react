import React from 'react';
import GridRow from './grid-row';
import _ from 'underscore';

export default React.createClass({
    propTypes: {
        columnInfo: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
        data: React.PropTypes.array.isRequired,
        searchParameter: React.PropTypes.string,
        searchBy: React.PropTypes.string,
        sortProperty: React.PropTypes.string,
        sortInversed: React.PropTypes.bool
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
    _getUniqueId() {
        const uniqueColumn = _(this.props.columnInfo).find((column) => column.unique);
        return uniqueColumn ? uniqueColumn.id : false;
    },
    render() {
        const searchParameter = this.props.searchParameter;
        const sortedData = this._sortRowData(this.props.data);
        const columnInfo = this.props.columnInfo;
        const uniqueId = this._getUniqueId();

        const rows = sortedData.map((rowData, index) => {
            const key = uniqueId ? rowData[uniqueId] : index;
            if (!searchParameter || this._searchRowData(rowData)) {
                return <GridRow columnInfo={columnInfo} data={rowData} key={key} reactKey={key}/>;
            }
        });

        return <div>{rows}</div>;
    }
});