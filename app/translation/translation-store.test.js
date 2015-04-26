import Immutable from 'immutable';
import AltApp from '../core/alt-app';
import Translation from './translation';
import TranslationStore from './translation-store';

describe('translation store', () => {
    afterEach(() => AltApp.flush());

    it('returns correct translation for provided id', () => {
        const id = 'graphs';
        const translatedString = 'Grafieken';
        const translatedItem = TranslationStore.translate(id);

        expect(translatedItem).toEqual(translatedString);
    });

});