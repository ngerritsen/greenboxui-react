import classnames from 'classnames';
import ImmutablePropTypes from 'react-immutable-proptypes';
import React from 'react/addons';

import GridEditableCell from './grid-cells/grid-editable-cell';
import GridActionCell from './grid-cells/grid-action-cell';
import GridProgressCell from './grid-cells/grid-progress-cell';
import GridCellTypes from './grid-cell-types';
import GridDateCell from './grid-cells/grid-date-cell';
import GridIconCell from './grid-cells/grid-icon-cell';
const PureRenderMixin = React.addons.PureRenderMixin;

export default React.createClass({
    mixins: [PureRenderMixin],
    propTypes: {
        columnInfo: ImmutablePropTypes.listOf(React.PropTypes.object).isRequired,
        data: React.PropTypes.object.isRequired
    },
    render() {
        const {columnInfo, data} = this.props;

        const cells = columnInfo.map((column) => {
            const {id, columns, type, template, handler, total, show, actionIcon, iconMap, colorMap} = column;
            let {color, value} = column;
            value = column.value ? column.value : id;
            let cellContent = <span>{data[id]}</span>;
            let finalType = type;

            if(typeof type === 'function') {
                finalType = type(data);
            }

            if (finalType === GridCellTypes.custom) {
                const Template = template;
                cellContent = <Template value={data[value]} context={data} key={id}/>;
            }
            else if (finalType === GridCellTypes.editable) {
                cellContent = <GridEditableCell value={data[value]} context={data} onEdit={handler} key={id}/>;
            }
            else if (finalType === GridCellTypes.progress) {
                cellContent = <GridProgressCell value={data[value]} total={data[total]} key={id}/>;
            }
            else if (finalType === GridCellTypes.action) {
                cellContent = <GridActionCell context={data} onAction={handler} actionIcon={actionIcon}/>
            }
            else if (finalType === GridCellTypes.date) {
                cellContent = <GridDateCell date={data[value]}/>
            }
            else if (finalType === GridCellTypes.icon) {
                cellContent = <GridIconCell value={data[value]} iconMap={iconMap}/>
            }

            if(colorMap) {
                color = colorMap.get(String(data[value]));
            }

            const classNames = classnames([
                'grid-cell',
                `small-${columns}`,
                'columns',
                {'dirty' : data.dirty},
                {[`grid-${type}-cell`]: type},
                {'hidden': show === false},
                {[`color-${color}`]: color}
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