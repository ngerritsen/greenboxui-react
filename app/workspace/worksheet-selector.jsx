import Immutable from 'immutable';
import React from 'react';

import AlarmView from '../alarms/alarm-view';
import LoggingView from '../logging/logging-view';
import SelectionBox from '../shared/selection-box';
import Slab from '../shared/slab';
import WorkspaceActions from './workspace-actions';
import WorksheetViews from './worksheet-views';

export default React.createClass({
    _handleAddWorksheet(event) {
        event.preventDefault();

        const selectedView = React.findDOMNode(this.refs.selectedView).value;
        const views = Immutable.Map(WorksheetViews);

        WorkspaceActions.addWorksheet(views.get(selectedView));
    },
    render() {
        const options = Immutable.Map(WorksheetViews)
            .map((view, key) => {
                return { label: key, value: key };
            })
            .toList();

        return (
            <Slab>
                <div className="vertical-center">
                    <div className="inner-vertical-center">
                        <SelectionBox options={options} ref="selectedView"/>
                        <button className="button radius" onClick={this._handleAddWorksheet}>Add</button>
                    </div>
                </div>
            </Slab>
        );
    }
});