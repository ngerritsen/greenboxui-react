import React from 'react';

export default React.createClass({
    render() {
        return (
            <div className="uncollapse row">
                {this.props.children}
            </div>
        );
    }
});