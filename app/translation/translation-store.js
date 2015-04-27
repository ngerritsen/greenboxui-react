import Immutable from 'immutable';
import AltApp from '../core/alt-app';
import Translation from './translation';
import TranslationActions from './translation-actions';

class TranslationStore {
    constructor() {
        this.defaultLanguage = 'en';
        this.currentLanguage = this.defaultLanguage;

        this.translations = Immutable.List();

        this.bindAction(TranslationActions.refreshTranslations, this.onRefreshTranslations);
        this.bindAction(TranslationActions.setCurrentLanguage, this.onSetCurrentLanguage);

        this.exportPublicMethods({
            translate: this.translate
        });

        this.on('init', this.bootstrap);
    }

    bootstrap() {
        TranslationActions.refreshTranslations();
        if (! Immutable.List.isList(this.translations)) {
            this.translations = Immutable.List(this.translations);
        }
    }

    onRefreshTranslations(payload) {
        this.translations = payload.translations;
    }

    onSetCurrentLanguage(payload) {
        this.currentLanguage = payload.languageId;
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
