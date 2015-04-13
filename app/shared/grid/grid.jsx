import React from 'react';
import GridHeadingRow from './grid-heading-row';
import GridBody from './grid-body';
import GridToolbar from './grid-toolbar';
import _ from 'underscore';

export default React.createClass({
    propTypes: {
        columnInfo: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
        data: React.PropTypes.array.isRequired
    },
    getInitialState() {
        return {
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
    render() {
        return (
            <div>
                <GridToolbar
                    onSearch={this._handleSearch}
                    columnInfo={this.props.columnInfo}
                />
                <ul className="grid">
                    <GridHeadingRow
                        columnInfo={this.props.columnInfo}
                        onSortBy={this._handleSortBy}
                        sortProperty={this.state.sortProperty}
                    />
                    <GridBody
                        columnInfo={this.props.columnInfo}
                        data={this.props.data}
                        searchParameter={this.state.searchParameter}
                        searchBy={this.state.searchBy}
                        sortProperty={this.state.sortProperty}
                        sortInversed={this.state.sortInversed}
                    />
                </ul>
            </div>
        );
    }
});