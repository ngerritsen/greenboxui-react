import TranslationStore from './translation-store';

export default {
    componentDidMount() {
        TranslationStore.listen(this._onTranslationChange);
        this._onTranslationChange();
    },
    componentWillUnmount() {
        TranslationStore.unlisten(this._onTranslationChange)
    },
    _onTranslationChange() {
        let translatedStrings = this.state.translatedStrings.map((item, key) => {
            return TranslationStore.translate(key);
        });
        this.setState({
            translatedStrings: translatedStrings
        });
    }
}