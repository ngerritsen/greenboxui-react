import React from 'react';
import moment from 'moment';

export default React.createClass({
    propTypes: {
       date: React.PropTypes.object
    },
    render() {
        const dateString = moment(this.props.date.getTime()).calendar();
        return (
            <span>{dateString}</span>
        );
    }
});