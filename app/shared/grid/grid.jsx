import React from 'react';
import GridHeadingRow from './grid-heading-row';
import GridBody from './grid-body';
import GridToolbar from './grid-toolbar';
import GridPagination from './grid-pagination';
import _ from 'underscore';

export default React.createClass({
    propTypes: {
        columnInfo: React.PropTypes.arrayOf(React.PropTypes.shape({
            columns: React.PropTypes.number.isRequired,
            handler: React.PropTypes.func,
            id: React.PropTypes.string.isRequired,
            sort: React.PropTypes.bool,
            title: React.PropTypes.string,
            type: React.PropTypes.string,
            template: React.PropTypes.element,
            unique: React.PropTypes.bool
        })),
        data: React.PropTypes.array.isRequired,
        showTools: React.PropTypes.bool
    },
    getDefaultProps() {
        return {
            showTools: true,
            pagination: false
        };
    },
    getInitialState() {
        return {
            currentPage: 0,
            sortProperty: '',
            sortInversed: false,
            searchParameter: '',
            searchBy: ''
        }
    },
    _handleSortBy(sortProperty, sortInversed) {
        this.setState({
            sortProperty: sortProperty,
            sortInversed: sortInversed
        });
    },
    _handleSearch(searchParameter, searchBy) {
        this.setState({
            searchParameter: searchParameter,
            searchBy: searchBy
        });
    },
    _handleChangePage(newPage) {
        this.setState({
            currentPage: newPage
        });
    },
    render() {
        let tools = '';
        let pagination = '';
        const totalRowCount = this.props.data.length;
        const pageRowCount = 5;

        if(this.props.showTools) {
            tools = <GridToolbar
                onSearch={this._handleSearch}
                columnInfo={this.props.columnInfo}
            />
        }

        if(this.props.pagination) {
            pagination = <GridPagination
                totalRowCount={totalRowCount}
                pageRowCount={pageRowCount}
                onChangePage={this._handleChangePage}
                currentPage={this.state.currentPage}
            />
        }

        return (
            <div>
                {tools}
                <ul className="grid">
                    <GridHeadingRow
                        columnInfo={this.props.columnInfo}
                        onSortBy={this._handleSortBy}
                        sortProperty={this.state.sortProperty}
                    />
                    <GridBody
                        columnInfo={this.props.columnInfo}
                        data={this.props.data}
                        currentPage={this.state.currentPage}
                        searchParameter={this.state.searchParameter}
                        searchBy={this.state.searchBy}
                        sortProperty={this.state.sortProperty}
                        sortInversed={this.state.sortInversed}
                    />
                </ul>
                {pagination}
            </div>
        );
    }
});