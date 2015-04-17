import React from 'react';
import ReactRouter from 'react-router';

let Link = ReactRouter.Link;

export default React.createClass({
    propTypes: {
        title: React.PropTypes.string.isRequired,
        items: React.PropTypes.arrayOf(React.PropTypes.shape({
            title: React.PropTypes.string,
            name: React.PropTypes.string,
            icon: React.PropTypes.string
        })).isRequired
    },
    render() {
        const items = this.props.items.map((item) => {
            return (
                <li className="side-nav-item" role="menuitem" key={item.name}>
                    <Link to={item.name} activeClassName="active">
                        <i className={`fa fa-${item.icon} fa-fw`}></i>&nbsp; {item.title}
                    </Link>
                </li>
            );
        });
        return (
            <ul className="side-nav" role="navigation" title={this.props.title}>
                {items}
            </ul>
        );
    }
});