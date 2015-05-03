import React from 'react';
import Icon from '../../icon';
import DateItem from '../../date';

export default React.createClass({
    propTypes: {
        date: React.PropTypes.object.isRequired
    },
    render() {
        return (
            <DateItem date={this.props.date}/>
        );
    }
});