import React from 'react';
import Immutable from 'immutable';
import TranslationMixin from '../../translation/translation-mixin';
import IconTypes from '../icon-types';

export default React.createClass({
    mixins: [TranslationMixin],
    translations: ['all', 'search'],
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
                        <select ref="searchBySelection" onChange={this._handleSearch}>
                            <option value={''} key={'all'}>{this.getTranslation('all')}</option>
                        {searchOptions}
                        </select>
                    </div>
                    <div className="small-8 columns">
                        <input type="text" id="search" placeholder={this.getTranslation('search')} ref="searchInput" onChange={this._handleSearch}></input>
                    </div>
                </div>
            </form>
        );
    }
});