import React from 'react';
import ReactRouter from 'react-router';
import Translator from '../translation/translator';

let Link = ReactRouter.Link;

export default React.createClass({
    propTypes: {
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
                        <i className={`fa fa-${item.icon} fa-fw`}></i>&nbsp; <Translator id={item.title}/>
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