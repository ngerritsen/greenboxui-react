import React from 'react';
import ControlInstanceView from './control-instance/control-instance-view';
import TopBar from './layout/top-bar-view';

React.render((
    <div>
        <TopBar/>
        <div className="content">
            <ControlInstanceView/>
        </div>
    </div>
    ),
    document.getElementById('greenbox-app')
);
