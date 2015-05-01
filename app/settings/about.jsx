import React from 'react';
import Immutable from 'immutable';
import Slab from '../shared/slab';
import Translator from '../translation/translator';
import TranslationStore from '../translation/translation-store';
import TranslationActions from '../translation/translation-actions';
import Setting from './setting';
import SettingTypes from './setting-types';

export default React.createClass({
    _handleChangeLanguage(newLanguageId) {
        TranslationActions.setCurrentLanguage(newLanguageId);
    },
    render() {
        return (
            <Slab>
                <Setting label="systemId" value="118"/>
                <Setting label="softwareVersion" value="6535"/>
                <Setting label="uiVersion" value="1.0.0"/>
                <Setting
                    label="language"
                    type={SettingTypes.selection}
                    handler={this._handleChangeLanguage}
                    options={Immutable.List.of(
                        { label: 'English', value: 'en' },
                        { label: 'Nederlands', value: 'nl' }
                    )}
                    defaultValue={TranslationStore.getState().currentLanguage}
                />
            </Slab>
        );
    }
});