import Immutable from 'immutable';
import AltApp from '../core/alt-app';
import Translation from './translation';

class TranslationStore {
    constructor() {
        this.currentLanguage = 'nl';
        this.defaultLanguage = 'en';

        this.translations = Immutable.List.of(
            new Translation({ id: 'graphs', en: 'Graphs', nl: 'Grafieken' }),
            new Translation({ id: 'settings', en: 'Settings', nl: 'Instellingen' }),
            new Translation({ id: 'configure', en: 'Configure', nl: 'Configureer' }),

            new Translation({ id: 'controlInstances', en: 'Control Instances', nl: 'Regeling Instanties' }),
            new Translation({ id: 'connections', en: 'Connections', nl: 'Koppelingen' }),

            new Translation({ id: 'license', en: 'License', nl: 'Licentie' }),
            new Translation({ id: 'about', en: 'About', nl: 'Over' }),
            new Translation({ id: 'development', en: 'Development', nl: 'Ontwikkeling' }),

            new Translation({ id: 'controlType', en: 'Control type', nl: 'Regeling type' }),
            new Translation({ id: 'controlName', en: 'Control name', nl: 'Regeling naam' }),
            new Translation({ id: 'amount', en: 'Amount', nl: 'Aantal' }),

            new Translation({ id: 'sourceType', en: 'Source type', nl: 'Bron type' }),
            new Translation({ id: 'sourceInstance', en: 'Source instance', nl: 'Bron instantie' }),
            new Translation({ id: 'targetType', en: 'Target type', nl: 'Doel type' }),
            new Translation({ id: 'targetInstance', en: 'Target instance', nl: 'Doel instantie' }),

            new Translation({ id: 'systemId', en: 'System ID', nl: 'Systeem ID' }),
            new Translation({ id: 'softwareVersion', en: 'Software version', nl: 'Software versie' }),
            new Translation({ id: 'uiVersion', en: 'UI version', nl: 'UI versie' }),
            new Translation({ id: 'addDummyConfig', en: 'Add dummy configuration', nl: 'Dummy configuratie toevoegen' }),
            new Translation({ id: 'add', en: 'Add', nl: 'Toevoegen' }),
            new Translation({ id: 'search', en: 'Search', nl: 'Zoeken' }),
            new Translation({ id: 'all', en: 'All', nl: 'Alle' }),
            new Translation({ id: 'addControl', en: 'Add control', nl: 'Regeling toevoegen' }),
            new Translation({ id: 'addConnection', en: 'Add connection', nl: 'Koppeling toevoegen' })
        );

        this.exportPublicMethods({
            translate: this.translate
        });

        this.on('init', this.bootstrap);
    }

    bootstrap() {
        if (! Immutable.List.isList(this.translations)) {
            this.translations = Immutable.List(this.translations);
        }
    }

    translate(id) {
        const { translations, currentLanguage, defaultLanguage } = this.getState();
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
}

export default AltApp.createStore(TranslationStore, 'TranslationStore');
