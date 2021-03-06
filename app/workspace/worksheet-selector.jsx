import Immutable from 'immutable';
import React from 'react';

import AlarmView from '../alarms/alarm-view';
import LoggingView from '../logging/logging-view';
import SelectionBox from '../shared/interaction/selection-box';
import Slab from '../shared/layout/slab';
import WorkspaceActions from './workspace-actions';
import WorksheetViews from './worksheet-views';

export default React.createClass({
    propTypes: {
        workspaceId: React.PropTypes.string.isRequired
    },
    _handleAddWorksheet(event) {
        event.preventDefault();

        const selectedView = React.findDOMNode(this.refs.selectedView).value;
        const views = Immutable.Map(WorksheetViews);
        WorkspaceActions.addWorksheet(this.props.workspaceId, views.get(selectedView));
    },
    render() {
        const options = Immutable.Map(WorksheetViews)
            .map((view, key) => {
                return { label: key, value: key };
            })
            .toList();

        return (
            <Slab>
                <div className="worksheet-selector">
                    <label htmlFor="viewSelection">Select a worksheet
                        <SelectionBox options={options} ref="selectedView"/>
                    </label>
                    <button className="button radius full-width" onClick={this._handleAddWorksheet}>Add</button>
                </div>
             </Slab>
        );
    }
});