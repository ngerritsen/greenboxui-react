import React from 'react';
import Slab from '../shared/slab';
import Translator from '../translation/translator';
import TranslationActions from '../translation/translation-actions';

export default React.createClass({
    _handleChangeLanguage() {
        const newLanguageId = React.findDOMNode(this.refs.selectedLanguage).value;
        TranslationActions.setCurrentLanguage(newLanguageId);
    },
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

                <div className="row setting">
                    <div className="small-6 medium-8 columns setting-column">
                        <span className="setting-description"><Translator id="language"/>:</span>
                    </div>
                    <div className="small-6 medium-4 columns setting-column">
                        <select ref="selectedLanguage" defaultValue="en" onChange={this._handleChangeLanguage}>
                            <option value="en">English</option>
                            <option value="nl">Nederlands</option>
                        </select>
                    </div>
                </div>
            </Slab>
        );
    }
});