import React from 'react';

export default React.createClass({
    render() {
        return (
            <aside className="left-off-canvas-menu">
                <ul className="off-canvas-list">
                    <li><a href="#">Home</a></li>
                    <li><a href="#/configure">Configure</a></li>
                </ul>
            </aside>
        );
    }
});