import React from 'react/addons';
import AltApp from '../core/alt-app';
import Immutable from 'immutable';
import shortId from 'shortid';
import ControlsView from './controls-view';
import ParameterStore from '../parameters/parameter-store';
import ControlInstanceStore from '../control-instance/control-instance-store';
import Control from '../control-instance/control';
import Parameter from '../parameters/parameter';
import Grid from '../shared/grid/grid';

const ReactTestUtils = React.addons.TestUtils;

describe('controls view', () => {

    const typeIdA = shortId.generate();
    const typeIdB = shortId.generate();

    const paramIdA = shortId.generate();
    const paramIdB = shortId.generate();
    const paramIdC = shortId.generate();

    const controlIdA = shortId.generate();
    const controlIdB = shortId.generate();
    const controlIdC = shortId.generate();

    const dummyControls = Immutable.List.of(
        new Control({ instanceId: controlIdA, typeId: typeIdA,
            parameters: Immutable.List.of(new Parameter({ parameterId: paramIdA }), new Parameter({ parameterId: paramIdB })) }),
        new Control({ instanceId: controlIdB, typeId: typeIdB, parameters: Immutable.List.of(new Parameter({ parameterId: paramIdC })) }),
        new Control({ instanceId: controlIdC, typeId: typeIdB, parameters: Immutable.List.of(new Parameter({ parameterId: paramIdC })) })
    );

    const dummyParams = Immutable.List.of(
        new Parameter({ controlInstanceId: controlIdA, parameterId: paramIdA, value: 2 }),
        new Parameter({ controlInstanceId: controlIdA, parameterId: paramIdB, value: 3 }),
        new Parameter({ controlInstanceId: controlIdB, parameterId: paramIdC, value: 'hello' }),
        new Parameter({ controlInstanceId: controlIdC, parameterId: paramIdC, value: 2 })
    );

    let controlsView;

    beforeEach(() => {
        spyOn(ParameterStore, 'getState').and.returnValue({ parameters: dummyParams });
        spyOn(ControlInstanceStore, 'getState').and.returnValue({ controls: dummyControls });

        controlsView = ReactTestUtils.renderIntoDocument(
            <ControlsView/>
        );
    });

    afterEach(() => controlsView.componentWillUnmount());

    it('gets initial state from stores and registers params', () => {
        expect(ParameterStore.getState).toHaveBeenCalled();
        expect(ControlInstanceStore.getState).toHaveBeenCalled();

        expect(controlsView.state.controls).toEqual(dummyControls);
        expect(controlsView.state.parameters).toEqual(dummyParams);
        expect(controlsView.state.registeredParameters.count()).toEqual(4);
        expect(controlsView.state.registeredParameters.get(0).parameterId).toEqual(dummyParams.get(0).parameterId);
    });

    it('renders all the parameters', () => {
        const grid = ReactTestUtils.findRenderedComponentWithType(controlsView, Grid);
        expect(grid.props.data.length).toEqual(4);
    });

    it('filters controls by type', () => {
        controlsView._handleSelectControlType(typeIdA);

        const grid = ReactTestUtils.findRenderedComponentWithType(controlsView, Grid);
        expect(grid.props.data.length).toEqual(2);
    });

    it('filters controls by instance', () => {
        controlsView._handleSelectControlType(typeIdB);
        controlsView._handleSelectControl(controlIdB);

        const grid = ReactTestUtils.findRenderedComponentWithType(controlsView, Grid);
        expect(grid.props.data.length).toEqual(1);
    })
});