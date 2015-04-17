import React from 'react';
import classNames from 'classnames';

export default React.createClass({
    propTypes: {
        totalRowCount: React.PropTypes.number.isRequired,
        pageRowCount: React.PropTypes.number.isRequired,
        onChangePage: React.PropTypes.func.isRequired,
        currentPage: React.PropTypes.number.isRequired
    },
    _handleChangePage(event) {
        event.preventDefault();

        const newIndex = parseInt(event.target.id);
        if (newIndex >= 0 && newIndex <= (this._getTotalPageCount() -1)) {
            this.props.onChangePage(newIndex);
        }
    },
    _getTotalPageCount() {
        return Math.ceil(this.props.totalRowCount/this.props.pageRowCount);
    },
    render() {
        let pages = [];
        const currentPage = this.props.currentPage;
        const firstPage = 0;
        const prevPage = currentPage - 1;
        const nextPage = currentPage + 1;
        const lastPage = this._getTotalPageCount() - 1;
        const totalRowCount = this.props.totalRowCount;

        const prevArrowClass = classNames([
            'arrow',
            {'unavailable': currentPage === 0}
        ]);
        const nextArrowClass = classNames([
            'arrow',
            {'unavailable': currentPage >= (this._getTotalPageCount() - 1)}
        ]);

        for(var rowCount = 0; rowCount < totalRowCount; rowCount += this.props.pageRowCount) {
            let page = rowCount / this.props.pageRowCount;
            let className = (page === currentPage) ? 'current' : '';

                pages.push(
                <li className={className} key={rowCount}>
                    <a href="" onClick={this._handleChangePage} id={page}>{page}</a>
                </li>
            );
        }

        return (
            <div className="pagination-centered">
                <ul className="pagination">
                    <li className={prevArrowClass} >
                        <a href="" onClick={this._handleChangePage} id={firstPage} key="first">
                            <i className="fa fa-angle-double-left" id={firstPage} alt="first"></i>
                        </a>
                    </li>
                    <li className={prevArrowClass} >
                        <a href="" onClick={this._handleChangePage} id={prevPage} key="prev">
                            <i className="fa fa-angle-left" id={prevPage} alt="previous"></i>
                        </a>
                    </li>
                    {pages}
                    <li className={nextArrowClass}>
                        <a href=""onClick={this._handleChangePage} id={nextPage} key="next">
                            <i className="fa fa-angle-right" id={nextPage} alt="next"></i>
                        </a>
                    </li>
                    <li className={nextArrowClass}>
                        <a href="" onClick={this._handleChangePage} id={lastPage} key="last">
                            <i className="fa fa-angle-double-right" id={lastPage} alt="last"></i>
                        </a>
                    </li>
                </ul>
            </div>
        );
    }
});