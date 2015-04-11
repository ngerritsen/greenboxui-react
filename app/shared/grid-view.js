import React from 'react';
import GridRow from './grid-row-view.js';
import GridHeadingRow from './grid-heading-row-view';
import GridBody from './grid-body-view';
import _ from 'underscore';

export default React.createClass({
    propTypes: {
        columnInfo: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
        data: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
        searchParameter: React.PropTypes.string,
        sortProperty: React.PropTypes.string
    },
    getInitialState() {
        return {
            sortProperty: '',
            searchParameter: ''
        }
    },
    _handleSortBy(sortProperty) {
        this.setState({ sortProperty: sortProperty });
    },
    _handleSearch() {
        const newSearchParameter = React.findDOMNode(this.refs.searchInput).value.trim();
        this.setState({ searchParameter: newSearchParameter });
    },
    render() {
        return (
            <div>
                <form>
                    <input type="text" placeholder="Search" ref="searchInput" onChange={this._handleSearch}></input>
                </form>
                <ul className="grid">
                    <GridHeadingRow columnInfo={this.props.columnInfo} onSortBy={this._handleSortBy}/>
                    <GridBody
                        columnInfo={this.props.columnInfo}
                        data={this.props.data}
                        searchParameter={this.state.searchParameter}
                        sortProperty={this.state.sortProperty}
                    />
                </ul>
            </div>
        );
    }
});