import React from 'react';
import GridRow from './grid-row-view.js';
import GridHeadingRow from './grid-heading-row-view.js';
import _ from 'underscore';

export default React.createClass({
    getInitialState() {
        return { sortProperty: '' }
    },
    _handleOnSortBy(sortProperty) {
        console.log(sortProperty);
        this.setState({ sortProperty: sortProperty });
    },
    render() {
        const sortProperty = this.state.sortProperty;
        const columnInfo = this.props.columnInfo;
        let data = this.props.data;

        if (sortProperty) {
            data = _(data).sortBy((item) => item[sortProperty]);
        }

        let gridBody = [];
        if(data && data.length) {
            gridBody = data.map((row, index) => {
                return <GridRow columnInfo={columnInfo} data={row} key={index}/>
            });
        }

        return (
            <div>
                <ul className="grid">
                    <GridHeadingRow columnInfo={columnInfo} onSortBy={this._handleOnSortBy}/>
                    {gridBody}
                </ul>
            </div>
        );
    }
});