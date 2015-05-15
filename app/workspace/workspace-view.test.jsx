import Immutable from 'immutable';
import React from 'react/addons';
import shortId from 'shortid';

import WorkspaceView from './workspace-view';
import WorkspaceStore from './workspace-store';
import WorksheetSelector from './worksheet-selector';
import Workspace from './workspace';

const ReactTestUtils = React.addons.TestUtils;

describe('workspace view', () => {
    const DummyView = React.createClass({
        render() {
            return null;
        }
    });
    const worksheetA = {id: shortId.generate(), view: DummyView};
    const worksheetB = {id: shortId.generate(), view: DummyView};

    const workspaceA = new Workspace({worksheets: Immutable.List.of(worksheetA, worksheetB), id: shortId.generate()});
    const workspaceB = new Workspace({worksheets: Immutable.List.of(worksheetA), id: shortId.generate()});

    let workspaceView;

    beforeEach(() => {
        WorkspaceStore.workspaces = Immutable.List.of(workspaceA, workspaceB);
        workspaceView = ReactTestUtils.renderIntoDocument(
            <WorkspaceView id={workspaceA.id}/>
        );
    });

    afterEach(() => {
        workspaceView.componentWillUnmount();
        React.unmountComponentAtNode(document.body);
    });

    it('listens to workspace store', () => {
        expect(workspaceView.state.workspaces).toEqual(WorkspaceStore.workspaces);
    });

    it('renders the correct worksheets', () => {
        const dummyViews = ReactTestUtils.scryRenderedComponentsWithType(workspaceView, DummyView);
        expect(dummyViews.length).toEqual(2);
    });

    it('renders one worksheet selector', () => {
        const worksheetSelector = ReactTestUtils.scryRenderedComponentsWithType(workspaceView, WorksheetSelector);
        expect(worksheetSelector.length).toEqual(1);
    });
});