import Immutable from 'immutable';
import TranslationStore from './translation-store';

export default {
    getInitialState() {
        return {translationDictionary: this._getMappedTranslationIds()};
    },
    componentDidMount() {
        this.unsubscribeTranslation = TranslationStore.listen(this._onTranslationsChanged);
        this.setState({ translationDictionary: this._getTranslations() });
    },
    componentWillUnmount() {
        this.unsubscribeTranslation();
    },
    _getMappedTranslationIds() {
        const translationIds = Immutable.List(this.translations);
        let translationDictionary = Immutable.Map();
        translationIds.forEach((id) => {
            translationDictionary = translationDictionary.set(id, id)
        });
        return translationDictionary;
    },
    _onTranslationsChanged() {
        this.setState({ translationDictionary: this._getTranslations() });
    },
    _getTranslations() {
        return this.state.translationDictionary.map((string, id) => {
            return TranslationStore.translate(id);
        });
    },
    getTranslation(id) {
        const translation = this.state.translationDictionary.get(id);
        return translation ? translation : id;
    }
}