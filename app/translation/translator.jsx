import React from 'react';
import TranslationStore from './translation-store';

export default React.createClass({
    propTypes: {
        id: React.PropTypes.string.isRequired
    },
    getInitialState() {
        return { translatedString: '' }
    },
    componentDidMount() {
        TranslationStore.listen(this._onChange);
        this._onChange();
    },
    componentWillUnmount() {
        TranslationStore.unlisten(this._onChange)
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