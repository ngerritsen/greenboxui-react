import React from 'react';
import {Link} from 'react-router';
import Translator from '../translation/translator';
import Icon from './icon';

export default React.createClass({
    propTypes: {
        items: React.PropTypes.arrayOf(React.PropTypes.shape({
            title: React.PropTypes.string,
            name: React.PropTypes.string,
            icon: React.PropTypes.string,
            inMenu: React.PropTypes.bool
        })).isRequired
    },
    render() {
        const filteredItems = this.props.items.filter((item) => item.inMenu !== false);
        const items = filteredItems.map((item) => {
            const {name, icon, title, params} = item;
            return (
                <li className="side-nav-item" role="menuitem" key={name}>
                    <Link to={name} params={params} activeClassName="active">
                        <Icon type={icon} fixedWidth={true}/>
                        <Translator id={title}/>
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