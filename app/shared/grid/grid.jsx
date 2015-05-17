import Immutable from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import React from 'react/addons';

import GridHeadingRow from './grid-heading-row';
import GridBody from './grid-body';
import GridToolbar from './grid-toolbar';
const PureRenderMixin = React.addons.PureRenderMixin;

export default React.createClass({
    mixins: [PureRenderMixin],
    propTypes: {
        columnInfo: ImmutablePropTypes.listOf(React.PropTypes.shape({
            columns: React.PropTypes.number,
            handler: React.PropTypes.func,
            id: React.PropTypes.string.isRequired,
            sort: React.PropTypes.bool,
            title: React.PropTypes.string,
            type: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.func]),
            template: React.PropTypes.element,
            value: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
            total: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
            unique: React.PropTypes.bool,
            show: React.PropTypes.bool,
            actionIcon: React.PropTypes.string,
            iconMap: React.PropTypes.instanceOf(Immutable.Map),
            colorMap: React.PropTypes.instanceOf(Immutable.Map)
        })),
        data: React.PropTypes.instanceOf(Immutable.List).isRequired,
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
        const {searchBy, sortProperty, sortInversed, searchParameter} = this.state;
        const {columnInfo, pagination} = this.props;
        const data = this.props.data.toArray();
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
                <div className="grid">
                    <GridHeadingRow
                        columnInfo={columnInfo}
                        onSortBy={this._handleSortBy}
                        sortProperty={sortProperty}
                    />
                    <GridBody
                        pagination={pagination}
                        columnInfo={columnInfo}
                        data={data}
                        searchParameter={searchParameter}
                        searchBy={searchBy}
                        sortProperty={sortProperty}
                        sortInversed={sortInversed}
                    />
                </div>
            </div>
        );
    }
});