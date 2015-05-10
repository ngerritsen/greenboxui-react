import Immutable from 'immutable';
import Reflux from 'reflux';
import Translation from './translation';
import SettingsStore from '../settings/settings-store';
import SettingsActions from '../settings/settings-actions';
import TranslationActions from './translation-actions';

export default Reflux.createStore({
    init() {
        this.defaultLanguage = 'en';
        this.currentLanguage = this.defaultLanguage;

        this.translations = Immutable.List();
        TranslationActions.refreshTranslations(getTranslations());

        this.listenToMany(TranslationActions);

        SettingsStore.listen(this.onSetSettings);
    },
    onRefreshTranslations(translations) {
        this.translations = translations;
    },
    onSetCurrentLanguage(languageId) {
        this.currentLanguage = languageId;
    },
    onSetSettings() {
        this.currentLanguage = SettingsStore.settings.get('currentLanguage');
    },
    translate(id) {
        const { translations, currentLanguage, defaultLanguage } = this;
        const translationItem = translations.find((item) => item.id === id);

        if(translationItem) {
            if(translationItem[currentLanguage]) {
                return translationItem[currentLanguage];
            }
            else {
                return translationItem[defaultLanguage];
            }
        }
        else {
            return id;
        }
    }
});

function getTranslations() {
    return Immutable.List.of(
        //General
        new Translation({ id: 'add', en: 'Add', nl: 'Toevoegen' }),
        new Translation({ id: 'search', en: 'Search', nl: 'Zoeken' }),
        new Translation({ id: 'all', en: 'All', nl: 'Alle' }),
        new Translation({ id: 'language', en: 'Language', nl: 'Taal' }),
        new Translation({ id: 'name', en: 'Name', nl: 'Naam' }),
        new Translation({ id: 'delete', en: 'Delete', nl: 'Verwijder' }),
        new Translation({ id: 'total', en: 'Total', nl: 'Totaal' }),
        new Translation({ id: 'used', en: 'Used', nl: 'Gebruikt' }),
        new Translation({ id: 'usage', en: 'Usage', nl: 'Gebruik' }),
        new Translation({ id: 'type', en: 'Type', nl: 'Type' }),
        new Translation({ id: 'control', en: 'Control', nl: 'Regelen' }),
        new Translation({ id: 'product', en: 'Product', nl: 'Product' }),
        new Translation({ id: 'general', en: 'General', nl: 'Algemeen' }),
        new Translation({ id: 'id', en: 'ID', nl: 'ID' }),
        new Translation({ id: 'date', en: 'Date', nl: 'Datum' }),
        new Translation({ id: 'message', en: 'Message', nl: 'Bericht' }),
        new Translation({ id: 'alarms', en: 'Alarms', nl: 'Alarmen' }),
        new Translation({ id: 'reset', en: 'Reset', nl: 'Reset' }),
        new Translation({ id: 'level', en: 'Level', nl: 'Niveau' }),
        new Translation({ id: 'logging', en: 'Logging', nl: 'Logging' }),

        //User levels
        new Translation({ id: 'userLevel', en: 'User level', nl: 'Gebruikersniveau' }),
        new Translation({ id: 'user', en: 'User', nl: 'Gebruiker' }),
        new Translation({ id: 'service', en: 'Service', nl: 'Service' }),
        new Translation({ id: 'developer', en: 'Developer', nl: 'Ontwikkelaar' }),

        //Greenbox terms
        new Translation({ id: 'typeId', en: 'Type ID', nl: 'Type ID' }),
        new Translation({ id: 'controlType', en: 'Control type', nl: 'Regeling type' }),
        new Translation({ id: 'controlInstance', en: 'Control instance', nl: 'Regeling instantie' }),
        new Translation({ id: 'controlTypeId', en: 'Control type ID', nl: 'Regeling type ID' }),
        new Translation({ id: 'instanceId', en: 'Instance ID', nl: 'Instantie ID' }),
        new Translation({ id: 'value', en: 'Value', nl: 'Waarde' }),
        new Translation({ id: 'unit', en: 'Unit', nl: 'Eenheid' }),

        // Main menu
        new Translation({ id: 'graphs', en: 'Graphs', nl: 'Grafieken' }),
        new Translation({ id: 'settings', en: 'Settings', nl: 'Instellingen' }),
        new Translation({ id: 'configure', en: 'Configure', nl: 'Configureer' }),

        //Config menu
        new Translation({ id: 'controlInstances', en: 'Control Instances', nl: 'Regeling Instanties' }),
        new Translation({ id: 'connections', en: 'Connections', nl: 'Koppelingen' }),
        new Translation({ id: 'license', en: 'License', nl: 'Licentie' }),

        //Settings menu
        new Translation({ id: 'about', en: 'About', nl: 'Over' }),
        new Translation({ id: 'development', en: 'Development', nl: 'Ontwikkeling' }),

        //Control instance page
        new Translation({ id: 'addControl', en: 'Add control', nl: 'Regeling toevoegen' }),
        new Translation({ id: 'controlType', en: 'Control type', nl: 'Regeling type' }),
        new Translation({ id: 'controlName', en: 'Control name', nl: 'Regeling naam' }),
        new Translation({ id: 'amount', en: 'Amount', nl: 'Aantal' }),

        //Connection page
        new Translation({ id: 'addConnection', en: 'Add connection', nl: 'Koppeling toevoegen' }),
        new Translation({ id: 'sourceType', en: 'Source type', nl: 'Bron type' }),
        new Translation({ id: 'sourceInstance', en: 'Source instance', nl: 'Bron instantie' }),
        new Translation({ id: 'targetType', en: 'Target type', nl: 'Doel type' }),
        new Translation({ id: 'targetInstance', en: 'Target instance', nl: 'Doel instantie' }),

        //Settings page
        new Translation({ id: 'systemId', en: 'System ID', nl: 'Systeem ID' }),
        new Translation({ id: 'softwareVersion', en: 'Software version', nl: 'Software versie' }),
        new Translation({ id: 'uiVersion', en: 'UI version', nl: 'UI versie' }),
        new Translation({ id: 'addDummyConfig', en: 'Add dummy configuration', nl: 'Dummy configuratie toevoegen' }),
        new Translation({ id: 'raiseAnAlarm', en: 'Raise an alarm', nl: 'Activeer een alarm' }),
        new Translation({ id: 'logToConsole', en: 'Log to the console', nl: 'Log naar de console' })
    );
}
