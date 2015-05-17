import Immutable from 'immutable';
import React from 'react';

import Icon from '../../icon';

export default React.createClass({
    propTypes: {
        value: React.PropTypes.oneOfType(React.PropTypes.string, React.PropTypes.number).isRequired,
        iconMap: React.PropTypes.instanceOf(Immutable.Map).isRequired
    },
    render() {
        const {value, iconMap} = this.props;
        const icon = iconMap.get(String(value));
        return (
            <Icon type={icon}/>
        );
    }
});