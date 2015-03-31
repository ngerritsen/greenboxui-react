import React from 'react';
import HelloWorldStore from '../stores/HelloWorldStore';
import {HelloWorldActions} from '../actions/HelloWorldActions';

export default React.createClass({
    getInitialState() {
        return {message: 'Loading..'}
    },
    componentDidMount() {
        this._registerAtStore();
    },
    _onChange() {
        this.setState({message: HelloWorldStore.getMessage()});
    },
    _registerAtStore() {
        HelloWorldStore.subscribe(() => this._onChange());
    },
    _handleSubmit(e) {
        e.preventDefault();
        var message = React.findDOMNode(this.refs.message).value.trim();
        HelloWorldActions.submitMessage(message);
    },
    render() {
        return <div>
            <p>{this.state.message}</p>
            <form>
                <input type="text" ref="message"/>
                <input type="button" ref="submit" onClick={this._handleSubmit}/>
            </form>
        </div>;
    }
});