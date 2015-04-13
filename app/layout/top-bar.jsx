import React from 'react';
import Time from '../shared/time/time'
export default React.createClass({
    render() {
        return (
            <div className="sticky">
                <nav className="top-bar" data-topbar role="navigation">
                    <ul className="title-area">
                        <li className="menu-button-container">
                            <i className="fa fa-bars fa-lg clickable"></i>
                        </li>
                        <li className="logo-container">
                            <img src="assets/images/logo.png" className="logo"/>
                        </li>
                    </ul>
                    <section className="top-bar-section">
                        <ul className="right info-area">
                            <li className="info-item">
                                <span><i className="fa fa-globe"></i></span>
                            </li>
                            <li className="info-item">
                                <span><i className="fa fa-bell"></i></span>
                            </li>
                            <li className="info-item">
                                <span><i className="fa fa-clock-o"></i><Time/></span>
                            </li>
                        </ul>
                    </section>
                </nav>
            </div>
        );
    }
});