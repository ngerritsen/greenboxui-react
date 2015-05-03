import React from 'react/addons';
import classnames from 'classnames';
import GridEditableCell from './grid-cells/grid-editable-cell';
import GridActionCell from './grid-cells/grid-action-cell';
import GridProgressCell from './grid-cells/grid-progress-cell';
import GridCellTypes from './grid-cell-types';
import GridDateCell from './grid-cells/grid-date-cell';
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
            const {id, columns, type, template, handler, value, total, show, actionIcon} = column;
            let cellContent = <span>{data[id]}</span>;

            if (type === GridCellTypes.custom) {
                const Template = template;
                cellContent = <Template value={data[id]} context={data} key={id}/>;
            }
            else if (type === GridCellTypes.editable) {
                cellContent = <GridEditableCell value={data[id]} context={data} onEdit={handler} key={id}/>;
            }
            else if (type === GridCellTypes.progress) {
                cellContent = <GridProgressCell value={data[value]} total={data[total]} key={id}/>;
            }
            else if (type === GridCellTypes.action) {
                cellContent = <GridActionCell context={data} onAction={handler} actionIcon={actionIcon}/>
            }
            else if (type === GridCellTypes.date) {
                cellContent = <GridDateCell date={data[id]}/>
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