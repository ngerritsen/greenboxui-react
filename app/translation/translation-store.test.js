import Immutable from 'immutable';
import Translation from './translation';
import TranslationStore from './translation-store';
import TranslationActions from './translation-actions';

describe('translation store', () => {
    const dummyTranslation1 = new Translation({ id: 'add', en: 'Add', nl: 'Toevoegen' });
    const dummyTranslation2 = new Translation({ id: 'remove', en: 'Remove' });

    beforeEach(() => {
        TranslationStore.translations = Immutable.Map();
        jasmine.clock().install();
        refreshTranslations(Immutable.List.of(dummyTranslation1, dummyTranslation2));
    });

    afterEach(() => {
        TranslationStore.translations = Immutable.Map();
        jasmine.clock().uninstall()
    });

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
        TranslationActions.setCurrentLanguage(languageId);
        jasmine.clock().tick(jasmine.DEFAULT_TIMEOUT_INTERVAL);
    }

    function refreshTranslations(translations) {
        TranslationActions.refreshTranslations(translations);
        jasmine.clock().tick(jasmine.DEFAULT_TIMEOUT_INTERVAL);
    }
});