import React from 'react';
import Slab from '../shared/slab';

export default React.createClass({
    render() {
        return (
            <Slab>
                <div className="row setting">
                    <div className="small-6 medium-8 columns">
                        <span className="setting-description">System ID:</span>
                    </div>
                    <div className="small-6 medium-4 columns">
                        <span className="setting-value">118</span>
                    </div>
                </div>

                <div className="row setting">
                    <div className="small-6 medium-8 columns">
                        <span className="setting-description">Software Version:</span>
                    </div>
                    <div className="small-6 medium-4 columns">
                        <span className="setting-value">6535</span>
                    </div>
                </div>

                <div className="row setting">
                    <div className="small-6 medium-8 columns">
                        <span className="setting-description">UI Version:</span>
                    </div>
                    <div className="small-6 medium-4 columns">
                        <span className="setting-value">1.0.0</span>
                    </div>
                </div>
            </Slab>
        );
    }
});