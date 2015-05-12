import React from 'react';
import Immutable from 'immutable';

import Translator from '../translation/translator';
import SettingsStore from '../settings/settings-store';
import SettingsActions from './settings-actions';
import Setting from './setting';
import SettingTypes from './setting-types';
import Slab from '../shared/slab';

export default React.createClass({
    _handleChangeLanguage(newLanguageId) {
        SettingsActions.setSettings(Immutable.Map({ currentLanguage: newLanguageId }));
    },
    render() {
        return (
            <Slab>
                <Setting
                    label="language"
                    type={SettingTypes.selection}
                    handler={this._handleChangeLanguage}
                    options={Immutable.List.of(
                        { label: 'English', value: 'en' },
                        { label: 'Nederlands', value: 'nl' }
                    )}
                    defaultValue={SettingsStore.settings.get('currentLanguage')}
                />
            </Slab>
        );
    }
});