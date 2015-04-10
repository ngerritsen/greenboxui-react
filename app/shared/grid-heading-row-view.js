import React from 'react';

export default React.createClass({
    render() {
        const cells = this.props.columnInfo.map((column) => {
            return <div className={`grid-cell small-${column.columns} columns`}>
                <strong>{column.title}</strong>
            </div>
        });
        return (
            <li className="grid-row grid-heading-row clearfix">
                {cells}
            </li>
        );
    }
});