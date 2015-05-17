import classnames from 'classnames';
import Icon from '../shared/icon';
import IconTypes from '../shared/icon-types';
import Immutable from 'immutable';
import React from 'react';
import { Route, RouteHandler, Link } from 'react-router';

import WorkspaceActions from './workspace-actions';

export default React.createClass({
    propTypes: {
        workspaces: React.PropTypes.instanceOf(Immutable.List).isRequired,
        current: React.PropTypes.string
    },
    _handleAddWorkspace(event) {
        event.preventDefault();

        WorkspaceActions.addWorkspace();
    },
    render() {
        const {workspaces, current} = this.props;
        const links = workspaces.map((workspace, index) => {
            const classNames = classnames([
                'tab-title',
                {'active': workspace.id === current}
            ]);

            return (
                <li className={classNames} key={workspace.id}>
                    <Link to="workspaces" params={{id: workspace.id}}>Workspace {index + 1}</Link>
                </li>
            );
        });

        const tools = Immutable.List.of((
            <li className="tab-title" key="add-new-workspace">
                <a href="" onClick={this._handleAddWorkspace}>
                    <Icon type={IconTypes.add}/>
                </a>
            </li>
        ));

        const tabsToRender = React.addons.createFragment({
            links: links,
            tools: tools
        });

        return (
            <div className="tabs-container">
                <ul className="tabs">
                    {tabsToRender}
                </ul>
            </div>
        );
    }
});