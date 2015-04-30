import Immutable from 'immutable';
import AltApp from '../core/alt-app';

class SettingsActions {
    setSettings(settings) {
        this.dispatch({
            settings: settings
        });
    }
}

export default AltApp.createActions(SettingsActions);