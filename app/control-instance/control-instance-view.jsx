import React from 'react';
import ControlInstanceStore from './control-instance-store';
import ControlInstanceActions from './control-instance-actions';
import ControlItem from './control-instance-item-view';

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
    _handleAddControl(event) {
        event.preventDefault();
        const newControlName = React.findDOMNode(this.refs.controlNameInput).value;
        ControlInstanceActions.addControl('Unknown type', newControlName);
    },
    render() {
        const controls = this.state.controls.map((control) => {
            return (
                <ControlItem control={control}  key={control.controlInstanceId} />
            );
        });

        return (
            <div>
                <form>
                    <input type="text" ref="controlNameInput"/>
                    <button type="submit" className="btn btn-primary" onClick={this._handleAddControl}>Add Control</button>
                </form>
                <ul>
                    {controls}
                </ul>
            </div>
        );
    }
});