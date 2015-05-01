import React from 'react';
import AutoListenerMixin from '../shared/auto-listener-mixin';
import TranslationStore from './translation-store';

export default React.createClass({
    mixins: [AutoListenerMixin],
    propTypes: {
        id: React.PropTypes.string.isRequired
    },
    getInitialState() {
        return { translatedString: '' }
    },
    componentDidMount() {
        this.listenToAuto(TranslationStore, this._onChange);
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