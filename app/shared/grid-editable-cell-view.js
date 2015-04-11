import React from 'react';

export default React.createClass({
    getInitialState() {
      return { editMode: false };
    },
    _handleToggleEdit(event) {
        const editMode = !this.state.editMode;
        this.setState({ editMode: editMode });
    },
    _handleEditValue(event) {
        const newValue = React.findDOMNode(this.refs.editedValueInput).value.trim();
        const oldValue = this.props.value;
        const context = this.props.context;
        if (newValue && newValue !== oldValue) {
            this.props.onEdit(newValue, context);
        }
        this._handleToggleEdit(event);
    },
    render() {
        const value = this.props.value;
        if(this.state.editMode) {
            return (
                <span className="clearfix">
                    <input className="left" defaultValue={value} ref="editedValueInput"/>
                    <i className="fa fa-check-circle fa-inline right clickable" onClick={this._handleEditValue}></i>
                </span>
            );
        }
        else {
            return (
                <span className="clearfix">
                    <span className="left">{value}</span>
                    <i className="fa fa-pencil fa-inline right clickable" onClick={this._handleToggleEdit}></i>
                </span>
            );
        }
    }
});