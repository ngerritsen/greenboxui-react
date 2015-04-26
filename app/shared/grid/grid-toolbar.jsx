import React from 'react';
import Immutable from 'immutable';
import Translator from '../../translation/translator';
import TranslationStore from '../../translation/translation-store';

export default React.createClass({
    propTypes: {
        onSearch: React.PropTypes.func.isRequired,
        columnInfo: React.PropTypes.arrayOf(React.PropTypes.object).isRequired
    },
    getInitialState() {
        return { translatedStrings: Immutable.Map({
            search: 'search',
            all: 'all'
        }) }
    },
    componentDidMount() {
        TranslationStore.listen(this._onChange);
        this._onChange();
    },
    componentWillUnmount() {
        TranslationStore.unlisten(this._onChange)
    },
    _onChange() {
        let translatedStrings = this.state.translatedStrings.set('search', TranslationStore.translate('search'));
        translatedStrings = translatedStrings.set('all', TranslationStore.translate('all'));
        this.setState({
            translatedStrings: translatedStrings
        });
    },
    _handleSearch() {
        const newSearchParameter = React.findDOMNode(this.refs.searchInput).value.trim();
        const newSearchBy = React.findDOMNode(this.refs.searchBySelection).value;
        this.props.onSearch(newSearchParameter, newSearchBy);
    },
    render() {
        const searchOptions = this.props.columnInfo.map((column) => {
            return <option value={column.id} key={column.id}>{column.title}</option>;
        });
        const translatedStrings = this.state.translatedStrings;
        return (
            <form>
                <div className="row">
                    <div className="small-4 columns">
                        <div className="row">
                            <div className="small-2 columns">
                                <label htmlFor="search" className="inline"><i className="fa fa-search fa-lg"></i></label>
                            </div>
                            <div className="small-10 columns">
                                <select ref="searchBySelection" onChange={this._handleSearch}>
                                    <option value={''} key={'all'}>{translatedStrings.get('all')}</option>
                                {searchOptions}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="small-8 columns">
                        <input type="text" id="search" placeholder={translatedStrings.get('search')} ref="searchInput" onChange={this._handleSearch}></input>
                    </div>
                </div>
            </form>
        );
    }
});