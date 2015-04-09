import React from 'react';
import ControlInstanceView from './control-instance/control-instance-view';

React.render((
    <div>
        <div className="sticky">
            <nav className="top-bar" data-topbar role="navigation">
                <ul className="title-area">
                    <li className="name">
                        <h1><a href="#">My Site</a></h1>
                    </li>
                    <!-- Remove the class "menu-icon" to get rid of menu icon. Take out "Menu" to just have icon alone -->
                    <li className="toggle-topbar menu-icon"><a href="#"><span>Menu</span></a></li>
                </ul>
            </nav>
        </div>
        <div className="content">
            <ControlInstanceView/>
        </div>
    </div>
    ),
    document.getElementById('greenbox-app')
);
