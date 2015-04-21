import React from 'react';
import GridEditableCell from './grid-editable-cell';
import GridDeleteCell from './grid-delete-cell';
import classnames from 'classnames';

export default React.createClass({
    propTypes: {
        columnInfo: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
        data: React.PropTypes.object.isRequired
    },
    render() {
        const columnInfo = this.props.columnInfo;
        const data = this.props.data;

        const cells = columnInfo.map((column) => {
            let cellContent = <span>{data[column.id]}</span>;

            if (column.type === 'custom') {
                const Template = column.template;
                cellContent = <Template value={data[column.id]} context={data} key={column.id}/>;
            }
            else if (column.type === 'editable') {
                cellContent = <GridEditableCell value={data[column.id]} context={data} onEdit={column.handler} key={column.id}/>;
            }
            else if (column.type === 'delete') {
                cellContent = <GridDeleteCell context={data} onDelete={column.handler}/>
            }

            const classNames = classnames([
                'grid-cell',
                `small-${column.columns}`,
                'columns',
                'clickable',
                {'dirty' : this.props.data.dirty},
                {[`grid-${column.type}-cell`]: column.type}
            ]);

            return (
                <div className={classNames} key={column.id}>
                    {cellContent}
                </div>
            );
        });

        return (
            <li className="grid-row grid-body-row clearfix">
                {cells}
            </li>
        );
    }
});