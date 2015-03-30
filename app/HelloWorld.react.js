import React from 'react';

export default React.createClass({
    getInitialState() {
        return {message: 'Hello World!'}
    },
    render() {
        return <p>{this.state.message}</p>;
    }
});