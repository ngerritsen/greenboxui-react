import {EventEmitter} from 'eventemitter';
import AppDispatcher from '../dispatcher/AppDispatcher';
import {CoreConstants} from '../constants/CoreConstants';
import {HelloWorldConstants} from '../constants/HelloWorldConstants';

class HelloWorldStore extends EventEmitter {
    constructor() {
        this.message = '';

        this.registerAtDispatcher();
    }

    getMessage() {
        return this.message;
    }

    emitChange() {
        this.emit(CoreConstants.CHANGE_EVENT);
    }

    subscribe(callback) {
        this.on(CoreConstants.CHANGE_EVENT, callback)
    }

    unsubscribe(callback) {
        this.off(CoreConstants.CHANGE_EVENT, callback)
    }

    handleDispatcherAction(payload) {
        var action = payload.action;

        switch(action.actionType) {
            case HelloWorldConstants.SUBMIT_MESSAGE:
                this.message = action.message;
                this.emitChange();
                break;
        }
    }

    registerAtDispatcher() {
        AppDispatcher.register((payload) => {
            this.handleDispatcherAction(payload);
        })
    }
}

export default new HelloWorldStore();
