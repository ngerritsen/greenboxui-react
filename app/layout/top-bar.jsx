import React from 'react';

export default React.createClass({
    render() {
        return (
            <div className="sticky">
                <nav className="top-bar" data-topbar role="navigation">
                    <ul className="title-area">
                        <li className="name">
                            <h1><a href="#">My Site</a></h1>
                        </li>
                    </ul>
                </nav>
            </div>
        );
    }
});