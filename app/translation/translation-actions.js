import Immutable from 'immutable';
import Reflux from 'reflux';
import Translation from './translation';

let TranslationActions = Reflux.createActions([
    'setCurrentLanguage',
    'refreshTranslations'
]);

export default TranslationActions;