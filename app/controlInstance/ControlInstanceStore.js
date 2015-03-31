import {EventEmitter} from 'eventemitter';
import AppDispatcher from '../core/AppDispatcher';
import {CoreConstants} from '../core/CoreConstants';
import {ControlInstanceConstants} from './ControlInstanceConstants';

class ControlInstanceStore extends EventEmitter {
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
            case ControlInstanceConstants.SUBMIT_MESSAGE:
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

export default new ControlInstanceStore();
