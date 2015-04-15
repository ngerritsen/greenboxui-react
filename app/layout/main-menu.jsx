import React from 'react';

export default React.createClass({
    render() {
        return (
            <aside className="left-off-canvas-menu">
                <ul className="side-nav main-menu">
                    <li role="menuitem">
                        <a href="#">
                            <span><i class="fa fa-home fa-"></i> {'Home'}</span>
                        </a>
                    </li>
                    <li role="menuitem">
                        <a href="#/configure">
                            <span><i class="fa fa-cogs"></i> {'Configure'}</span>
                        </a>
                    </li>
                </ul>
            </aside>
        );
    }
});