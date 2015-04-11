import React from 'react';
import GridEditableCell from './grid-editable-cell-view';

export default React.createClass({
    render() {
        const columnInfo = this.props.columnInfo;
        const data = this.props.data;

        const cells = columnInfo.map((column) => {
            let cellContent = <span>{data[column.id]}</span>;
            if (column.template) {
                const Template = column.template;
                cellContent = <Template value={data[column.id]} context={data} key={column.id}/>;
            }
            if (column.editAble) {
                cellContent = <GridEditableCell value={data[column.id]} context={data} onEdit={column.onEdit} key={column.id}/>;
            }
            return <div className={`grid-cell small-${column.columns} columns`} key={column.id}>{cellContent}</div>
        });

        return (
            <li className="grid-row grid-body-row clearfix">
                {cells}
            </li>
        );
    }
});