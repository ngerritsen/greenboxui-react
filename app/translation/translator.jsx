import React from 'react';
import ListenerMixin from 'alt/mixins/ListenerMixin';
import TranslationStore from './translation-store';

export default React.createClass({
    mixins: [ListenerMixin],
    propTypes: {
        id: React.PropTypes.string.isRequired
    },
    getInitialState() {
        return { translatedString: '' }
    },
    componentDidMount() {
        this.listenTo(TranslationStore, this._onChange);
        this._onChange();
    },
    _onChange() {
        const translatedString = TranslationStore.translate(this.props.id);
        this.setState({
            translatedString: translatedString
        });
    },
    render() {
        return <span>{this.state.translatedString}</span>
    }
});