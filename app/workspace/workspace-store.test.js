import Immutable from 'immutable';
import React from 'react/addons';
import shortId from 'shortid';

import Workspace from './workspace';
import WorkspaceStore from './workspace-store';
import WorkspaceActions from './workspace-actions';

describe('workspace store', () => {

    const DummyComponent = React.createClass({
        render() {
            return <span>Dummy</span>
        }
    });

    beforeEach(() => {
        WorkspaceStore.workspaces = Immutable.List.of(
            new Workspace({id: shortId.generate()})
        );
        jasmine.clock().install()
    });

    afterEach(() => {
        WorkspaceStore.workspaces = Immutable.List.of(
            new Workspace({id: shortId.generate()})
        );
        jasmine.clock().uninstall()
    });

    it('it adds a workspace', () => {
        addWorkspace();

        expect(WorkspaceStore.workspaces.count()).toEqual(2);
    });

    it('it adds a worksheet to a workspace', () => {
        const workspaceId = WorkspaceStore.workspaces.get(0).id;
        addWorksheet(workspaceId, DummyComponent);

        const workspace = WorkspaceStore.workspaces.get(0);

        expect(workspace.worksheets.count()).toEqual(1);
        expect(workspace.worksheets.get(0).view).toEqual(DummyComponent);
        expect(workspace.worksheets.get(0).id).toBeTruthy();
    });

    function addWorkspace() {
        WorkspaceActions.addWorkspace();
        jasmine.clock().tick(jasmine.DEFAULT_TIMEOUT_INTERVAL);
    }

    function addWorksheet(workspaceId, view) {
        WorkspaceActions.addWorksheet(workspaceId, view);
        jasmine.clock().tick(jasmine.DEFAULT_TIMEOUT_INTERVAL);
    }
});
