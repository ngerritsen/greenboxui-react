import React from 'react';

export default React.createClass({
    render() {
        const columnInfo = this.props.columnInfo;
        const data = this.props.data;
        const cells = columnInfo.map((column) => {
            if (column.template) {
                const Template = column.template;
                return <div className={`grid-cell small-${column.columns} column`}>
                    <Template data={data} />
                </div>
            }
            return <div className={`grid-cell small-${column.columns} columns`}>{data[column.id]}</div>
        });

        return (
            <li className="grid-row clearfix">
                {cells}
            </li>
        );
    }
});