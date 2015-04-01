import React from 'react';
import ControlInstanceStore from './control-instance-store';

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
            return <li>{control.controlTypeId}: {control.name}</li>;
        });

        return (
            <div>
                <ul>
                    {controls}
                </ul>
            </div>
        );
    }
});