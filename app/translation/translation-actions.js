import Immutable from 'immutable';
import AltApp from '../core/alt-app';
import Translation from './translation';

class TranslationActions {
    setCurrentLanguage(languageId) {
        this.dispatch({
            languageId: languageId
        });
    }

    refreshTranslations() {
        this.dispatch({
            translations: Immutable.List.of(
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

                //Greenbox terms
                new Translation({ id: 'typeId', en: 'Type ID', nl: 'Type ID' }),
                new Translation({ id: 'controlType', en: 'Control type', nl: 'Regeling type' }),
                new Translation({ id: 'controlTypeId', en: 'Control type ID', nl: 'Regeling type ID' }),
                new Translation({ id: 'instanceId', en: 'Instance ID', nl: 'Instantie ID' }),

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
                new Translation({ id: 'addDummyConfig', en: 'Add dummy configuration', nl: 'Dummy configuratie toevoegen' })
            )
        });
    }
}

export default AltApp.createActions(TranslationActions);