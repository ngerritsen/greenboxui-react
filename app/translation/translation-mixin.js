import Immutable from 'immutable';
import TranslationStore from './translation-store';

export default {
    getInitialState() {
        return { translationDictionary: Immutable.Map() };
    },
    componentWillMount() {
        const translationIds = Immutable.List(this.translations);
        let translationDictionary = Immutable.Map();
        translationIds.forEach((id) => { translationDictionary = translationDictionary.set(id, id)});
        this.setState({ translationDictionary: translationDictionary });
    },
    componentDidMount() {
        TranslationStore.listen(this._onTranslationsChanged);
        this._onTranslationsChanged();
    },
    _onTranslationsChanged() {
        const translationDictionary = this.state.translationDictionary.map((string, id) => {
            return TranslationStore.translate(id);
        });
        this.setState({ translationDictionary: translationDictionary });
    },
    getTranslation(id) {
        const translation = this.state.translationDictionary.get(id);
        return translation ? translation : id;
    }
}