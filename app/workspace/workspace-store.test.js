import React from 'react/addons';

import WorkspaceStore from './workspace-store';
import WorkspaceActions from './workspace-actions';

describe('workspace store', () => {

    const DummyComponent = React.createClass({
        render() {
            return <span>Dummy</span>
        }
    });

    beforeEach(() => {
        jasmine.clock().install()
    });

    afterEach(() => {
        jasmine.clock().uninstall()
    });

    it('it adds a worksheet', () => {
        addWorksheet(DummyComponent);

        expect(WorkspaceStore.workspace.count()).toEqual(1);
        expect(WorkspaceStore.workspace.get(0).view).toEqual(DummyComponent);
    });

    function addWorksheet(view) {
        WorkspaceActions.addWorksheet(view)
        jasmine.clock().tick(jasmine.DEFAULT_TIMEOUT_INTERVAL);
    }
});
