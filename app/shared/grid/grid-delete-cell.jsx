import React from 'react';

export default React.createClass({
    propTypes: {
      context: React.PropTypes.object.isRequired,
      onDelete: React.PropTypes.func.isRequired
    },
    _handleDelete(event) {
        event.preventDefault();
        this.props.onDelete(this.props.context);
    },
    render() {
        return <i className="fa fa-trash clickable" onClick={this._handleDelete}></i>;
    }
});