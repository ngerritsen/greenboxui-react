import React from 'react/addons';
import classnames from 'classnames';
import GridEditableCell from './grid-editable-cell';
import GridDeleteCell from './grid-delete-cell';
import GridProgressCell from './grid-progress-cell';
const PureRenderMixin = React.addons.PureRenderMixin;

export default React.createClass({
    mixins: [PureRenderMixin],
    propTypes: {
        columnInfo: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
        data: React.PropTypes.object.isRequired
    },
    render() {
        const {columnInfo, data} = this.props;

        const cells = columnInfo.map((column) => {
            const {id, columns, type, template, handler, value, total, show} = column;
            let cellContent = <span>{data[id]}</span>;

            if (type === 'custom') {
                const Template = template;
                cellContent = <Template value={data[id]} context={data} key={id}/>;
            }
            else if (type === 'editable') {
                cellContent = <GridEditableCell value={data[id]} context={data} onEdit={handler} key={id}/>;
            }
            else if (type === 'progress') {
                cellContent = <GridProgressCell value={data[value]} total={data[total]} key={id}/>;
            }
            else if (type === 'delete') {
                cellContent = <GridDeleteCell context={data} onDelete={handler}/>
            }

            if(show === false) {
                cellContent = '';
            }

            const classNames = classnames([
                'grid-cell',
                `small-${columns}`,
                'columns',
                {'dirty' : data.dirty},
                {[`grid-${type}-cell`]: type}
            ]);

            return (
                <div className={classNames} key={id}>
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