import React from 'react';
import Reflux from 'reflux';
import moment from 'moment';
import TimeStore from './time-store';

export default React.createClass({
    mixins: [Reflux.connect(TimeStore, 'time')],
    getInitialState() {
        return { time: '' }
    },
    render() {
        let timeString = '';
        if (this.state.time.getTime) {
            timeString = moment(this.state.time.getTime()).format('hh:mm:ss');
        }

        return <span>{timeString}</span>;
    }
});