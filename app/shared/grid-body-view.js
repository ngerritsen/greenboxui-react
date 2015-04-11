import React from 'react';
import GridRow from './grid-row-view.js';
import GridHeadingRow from './grid-heading-row-view.js';
import _ from 'underscore';

export default React.createClass({
    propTypes: {
        columnInfo: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
        data: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
        searchParameter: React.PropTypes.string,
        sortProperty: React.PropTypes.string
    },
    _searchRowData(rowData) {
        const formattedSearchParameter = String(this.props.searchParameter).toLowerCase();
        const columns = this.props.columnInfo;

        for(let i = 0; i < columns.length; i++) {
            const formattedCellData = String(rowData[columns[i].id]).toLowerCase();
            if(formattedCellData.indexOf(formattedSearchParameter) > -1) {
                return true;
            }
        }
    },
    _sortRowData(rowData) {
        const sortProperty = this.props.sortProperty;
        if (sortProperty) {
            return _(rowData).sortBy((item) => item[sortProperty]);
        }
        return this.props.data;
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
                return <GridRow columnInfo={columnInfo} data={rowData} key={key}/>;
            }
        });

        return <div>{rows}</div>;
    }
});