import React from 'react';
import Slab from '../shared/slab';
import Translator from '../translation/translator';

export default React.createClass({
    render() {
        return (
            <Slab>
                <div className="row setting">
                    <div className="small-6 medium-8 columns setting-column">
                        <span className="setting-description"><Translator id="systemId"/>:</span>
                    </div>
                    <div className="small-6 medium-4 columns setting-column">
                        <span className="setting-value">118</span>
                    </div>
                </div>

                <div className="row setting">
                    <div className="small-6 medium-8 columns setting-column">
                        <span className="setting-description"><Translator id="softwareVersion"/>:</span>
                    </div>
                    <div className="small-6 medium-4 columns setting-column">
                        <span className="setting-value">6535</span>
                    </div>
                </div>

                <div className="row setting">
                    <div className="small-6 medium-8 columns setting-column">
                        <span className="setting-description"><Translator id="uiVersion"/>:</span>
                    </div>
                    <div className="small-6 medium-4 columns setting-column">
                        <span className="setting-value">1.0.0</span>
                    </div>
                </div>
            </Slab>
        );
    }
});