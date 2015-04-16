import React from 'react';

export default React.createClass({
    propTypes: {
        totalRowCount: React.PropTypes.number,
        pageRowCount: React.PropTypes.number,
        onChangePage: React.PropTypes.func,
        currentPage: React.PropTypes.number
    },
    _handleChangePage(event) {
        event.preventDefault();

        const newIndex = parseInt(event.target.textContent) - 1;
        this.props.onChangePage(newIndex);
    },
    render() {
        let links = [];
        for(var i = 0; i <= this.props.totalRowCount; i += this.props.pageRowCount) {
            let page = (i/this.props.pageRowCount) + 1;
            let className = (page === this.props.currentPage + 1) ? 'current' : '';

                links.push(
                <li className={className} key={i}>
                    <a href="" onClick={this._handleChangePage}>{page}</a>
                </li>
            );
        }

        return (
            <div className="pagination-centered">
                <ul className="pagination">
                    {links}
                </ul>
            </div>
        );
    }
});