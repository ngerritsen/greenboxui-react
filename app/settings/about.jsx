import React from 'react';
import Slab from '../shared/slab';
import Translator from '../translation/translator';
import Setting from './setting';
import SettingTypes from './setting-types';

export default React.createClass({
    render() {
        return (
            <Slab>
                <Setting label="systemId" value="118"/>
                <Setting label="softwareVersion" value="6535"/>
                <Setting label="uiVersion" value="1.0.0"/>
            </Slab>
        );
    }
});