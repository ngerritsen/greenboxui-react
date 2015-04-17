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

        const newIndex = parseInt(event.target.textContent);
        this.props.onChangePage(newIndex);
    },
    render() {
        let links = [];
        for(var rowCount = 0; rowCount < this.props.totalRowCount; rowCount += this.props.pageRowCount) {
            let page = rowCount / this.props.pageRowCount;
            let className = (page === this.props.currentPage) ? 'current' : '';

                links.push(
                <li className={className} key={rowCount}>
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