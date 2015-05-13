import Immutable from 'immutable';
import React from 'react';

import AlarmView from '../alarms/alarm-view';
import LoggingView from '../logging/logging-view';
import SelectionBox from '../shared/selection-box';
import Slab from '../shared/slab';
import WorkspaceActions from './workspace-actions';
import WorksheetViews from './worksheet-views';

export default React.createClass({
    _handleAddWorksheet(viewId) {
        const views = Immutable.Map(WorksheetViews);

        WorkspaceActions.addWorksheet(views.get(viewId));
    },
    render() {
        const options = Immutable.Map(WorksheetViews)
            .map((view, key) => {
                return { label: key, value: key };
            })
            .toList();

        return (
            <Slab>
                <SelectionBox options={options} handler={this._handleAddWorksheet}/>
            </Slab>
        );
    }
});