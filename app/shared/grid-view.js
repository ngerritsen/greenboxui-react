import React from 'react';
import GridRow from './grid-row-view.js';
import GridHeadingRow from './grid-heading-row-view.js';

export default React.createClass({
    render() {
        const columnInfo = this.props.columnInfo;
        let gridBody = [];
        if(this.props.data) {
            gridBody = this.props.data.map((rowData) => {
                return <GridRow columnInfo={columnInfo} data={rowData} />
            });
        }

        return (
            <ul className="grid">
                <GridHeadingRow columnInfo={columnInfo}/>
                {gridBody}
            </ul>
        );
    }
});