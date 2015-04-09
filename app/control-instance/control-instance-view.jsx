import React from 'react';
import ControlInstanceStore from './control-instance-store';
import ControlInstanceActions from './control-instance-actions';
import ControlItem from './control-instance-item-view';
import ControlInstanceAddTool from './control-instance-add-tool-view';

export default React.createClass({
    getInitialState() {
        return { controls: [] }
    },
    componentDidMount() {
        ControlInstanceStore.listen(this._onChange);
        this._onChange();
    },
    componentWillUnmount() {
        ControlInstanceStore.unlisten(this._onChange)
    },
    _onChange() {
        const newControls = ControlInstanceStore.getState().controls;
        this.setState({ controls: newControls });
    },
    render() {
        const controls = this.state.controls.map((control) => {
            return (
                <ControlItem control={control}  key={control.instanceId} />
            );
        });

        return (
            <div>
                <ControlInstanceAddTool/>
                <div className="row">
                    <ul className="grid">
                        <li className="grid-row row clearfix">
                            <div className="grid-cell column small-5">Type</div>
                            <div className="grid-cell column small-5">Name</div>
                            <div className="grid-cell column small-2"></div>
                        </li>
                    {controls}
                    </ul>
                </div>
            </div>
        );
    }
});