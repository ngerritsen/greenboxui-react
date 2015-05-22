import Immutable from 'immutable';
import Reflux from 'reflux';

import SettingsActions from './settings-actions'
import UserLevels from '../shared/user-levels';

export default Reflux.createStore({
    init() {
        this.settings = Immutable.Map({
            product: 'isii-compact',
            user: UserLevels.user,
            logToConsole: false
        });

        this.listenToMany(SettingsActions);
    },
    onSetSettings(settings) {
        settings.forEach((setting, key) => {
            this.settings = this.settings.set(key, setting);
        });
        console.log(this.settings.toJS());
        this.trigger(this.settings);
    }
});