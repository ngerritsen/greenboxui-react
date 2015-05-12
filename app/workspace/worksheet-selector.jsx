import Immutable from 'immutable';
import React from 'react';

import AlarmView from '../alarms/alarm-view';
import LoggingView from '../logging/logging-view';
import SelectionBox from '../shared/selection-box';
import Slab from '../shared/slab';
import WorkspaceActions from './workspace-actions';

export default React.createClass({
    _handleAddWorksheet(view) {
        WorkspaceActions.addWorksheet(view);
    },
    render() {
        const options = Immutable.List.of(
            { label: 'alarms', value: AlarmView },
            { label: 'logging', value: LoggingView }
        );

        return (
            <Slab>
                <SelectionBox options={options} handler={this._handleAddWorksheet}/>
            </Slab>
        );
    }
});