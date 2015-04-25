import React from 'react';
import GridHeadingRow from './grid-heading-row';
import GridBody from './grid-body';
import GridToolbar from './grid-toolbar';
import ReactWithAddons from 'react/addons'
const PureRenderMixin = ReactWithAddons.addons.PureRenderMixin;

export default React.createClass({
    mixins: [PureRenderMixin],
    propTypes: {
        columnInfo: React.PropTypes.arrayOf(React.PropTypes.shape({
            columns: React.PropTypes.number.isRequired,
            handler: React.PropTypes.func,
            id: React.PropTypes.string.isRequired,
            sort: React.PropTypes.bool,
            title: React.PropTypes.string,
            type: React.PropTypes.string,
            template: React.PropTypes.element,
            value: React.PropTypes.oneOfType(React.PropTypes.string, React.PropTypes.number),
            total: React.PropTypes.number,
            unique: React.PropTypes.bool
        })),
        data: React.PropTypes.array.isRequired,
        showTools: React.PropTypes.bool,
        pagination: React.PropTypes.number
    },
    getDefaultProps() {
        return {
            showTools: true,
            pagination: 0
        };
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
        let tools = '';

        if(this.props.showTools) {
            tools = <GridToolbar
                onSearch={this._handleSearch}
                columnInfo={this.props.columnInfo}
            />
        }

        return (
            <div>
                {tools}
                <GridHeadingRow
                    columnInfo={this.props.columnInfo}
                    onSortBy={this._handleSortBy}
                    sortProperty={this.state.sortProperty}
                />
                <GridBody
                    pagination={this.props.pagination}
                    columnInfo={this.props.columnInfo}
                    data={this.props.data}
                    searchParameter={this.state.searchParameter}
                    searchBy={this.state.searchBy}
                    sortProperty={this.state.sortProperty}
                    sortInversed={this.state.sortInversed}
                />
            </div>
        );
    }
});