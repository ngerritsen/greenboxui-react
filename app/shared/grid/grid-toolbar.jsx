import React from 'react';

export default React.createClass({
    propTypes: {
        onSearch: React.PropTypes.func.isRequired,
        columnInfo: React.PropTypes.arrayOf(React.PropTypes.object).isRequired
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
                                    <option value={''} key={'all'}>All</option>
                                {searchOptions}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="small-8 columns">
                        <input type="text" id="search" placeholder="Search" ref="searchInput" onChange={this._handleSearch}></input>
                    </div>
                </div>
            </form>
        );
    }
});