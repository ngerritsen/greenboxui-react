import Immutable from 'immutable';
import AltApp from '../core/alt-app';
import Translation from './translation';
import TranslationStore from './translation-store';
import TranslationActions from './translation-actions';

describe('translation store', () => {
    const dummyTranslation1 = new Translation({ id: 'add', en: 'Add', nl: 'Toevoegen' });
    const dummyTranslation2 = new Translation({ id: 'remove', en: 'Remove' });

    beforeEach(() => {
        refreshTranslations(Immutable.List.of(dummyTranslation1, dummyTranslation2));
    });

    afterEach(() => AltApp.flush());

    it('returns correct translation for provided id', () => {
        const language = 'nl';
        setCurrentLanguage(language);

        const translatedItem = TranslationStore.translate(dummyTranslation1.id);

        expect(translatedItem).toEqual(dummyTranslation1[language]);
    });

    it('returns default translation when translation is not available in that language', () => {
        const language = 'nl';
        const defaultLanguage = 'en';
        setCurrentLanguage(language);

        const translatedItem = TranslationStore.translate(dummyTranslation2.id);

        expect(translatedItem).toEqual(dummyTranslation2[defaultLanguage]);
    });

    it('returns id when translation is not available', () => {
        const nonExistingId = 'nonExistingId1234';
        const translatedItem = TranslationStore.translate(nonExistingId);

        expect(translatedItem).toEqual(nonExistingId);
    });

    function setCurrentLanguage(languageId) {
        AltApp.dispatcher.dispatch({
            action: TranslationActions.SET_CURRENT_LANGUAGE,
            data: {
                languageId: languageId
            }
        })
    }

    function refreshTranslations(translations) {
        AltApp.dispatcher.dispatch({
            action: TranslationActions.REFRESH_TRANSLATIONS,
            data: {
                translations: translations
            }
        })
    }
});