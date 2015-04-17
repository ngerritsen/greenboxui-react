import React from 'react';

export default React.createClass({
    render() {
        return (
            <div className="content row">
                {this.props.children}
            </div>
        );
    }
});