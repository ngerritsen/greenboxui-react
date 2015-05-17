import React from 'react';
import Icon from '../../icon';
import IconTypes from '../../icon-types';

export default React.createClass({
    propTypes: {
        context: React.PropTypes.object.isRequired,
        onEdit: React.PropTypes.func.isRequired,
        value: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]).isRequired
    },
    getInitialState() {
      return { editMode: false };
    },
    _handleToggleEdit(event) {
        const editMode = !this.state.editMode;
        this.setState({ editMode: editMode });
    },
    _handleEditValue(event) {
        event.preventDefault();

        const {value, context, onEdit} = this.props;
        const newValue = React.findDOMNode(this.refs.editedValueInput).value.trim();
        const oldValue = String(value);
        if (newValue && newValue !== oldValue) {
            onEdit(newValue, context);
        }
        this._handleToggleEdit(event);
    },
    render() {
        const value = this.props.value;
        if(this.state.editMode) {
            return (
                <form className="clearfix grid-editable-cell clickable" onSubmit={this._handleEditValue}>
                    <input type="text" className="left" defaultValue={value} ref="editedValueInput"/>
                    <button type="submit" className="icon-button" ref="toggleEditMode" onClick={this._handleEditValue}>
                        <Icon type={IconTypes.confirm} inline={true}/>
                    </button>
                </form>
            );
        }
        else {
            return (
                <span className="clearfix grid-editable-cell clickable" onClick={this._handleToggleEdit}>
                    <span className="left">{value}</span>
                    <button type="submit" className="icon-button" ref="toggleEditMode" onClick={this._handleToggleEdit}>
                        <Icon type={IconTypes.edit} inline={true}/>
                    </button>
                </span>
            );
        }
    }
});