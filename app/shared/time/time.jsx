import React from 'react';
import moment from 'moment';
import TimeStore from './time-store';

export default React.createClass({
    getInitialState() {
        return { time: '' }
    },
    componentDidMount() {
        TimeStore.listen(this._onChange);
        this._onChange();
    },
    componentWillUnmount() {
        TimeStore.unlisten(this._onChange)
    },
    _onChange() {
        const newTime = TimeStore.getState().time;
        this.setState({ time: newTime });
    },
    render() {
        let timeString = '';
        if (this.state.time.getTime) {
            timeString = moment(this.state.time.getTime()).format('hh:mm:ss');
        }

        return <span>{timeString}</span>;
    }
});